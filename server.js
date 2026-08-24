import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 4200;
const ROOT = __dirname;
const dataDir = path.join(ROOT, 'public', 'data');
const assetsDir = path.join(ROOT, 'public', 'assets');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

function git(cmd) {
  try { return execSync(cmd, { cwd: ROOT, stdio: 'pipe' }).toString().trim(); }
  catch (_) { return null; }
}

function gitWithOutput(cmd) {
  try {
    const result = execSync(cmd, { cwd: ROOT, stdio: 'pipe' });
    const stdout = result ? result.toString().trim() : '';
    return { ok: true, stdout, stderr: '' };
  } catch (err) {
    const stdout = err.stdout ? (Buffer.isBuffer(err.stdout) ? err.stdout.toString().trim() : String(err.stdout).trim()) : '';
    const stderr = err.stderr ? (Buffer.isBuffer(err.stderr) ? err.stderr.toString().trim() : String(err.stderr).trim()) : '';
    return { ok: false, stdout, stderr, message: err.message };
  }
}

function send(res, data, code) {
  res.writeHead(code || 200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (c) => body += c);
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch (_) { resolve({}); } });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const url = req.url;

  // ── save-data ──
  if (url === '/api/save-data' && req.method === 'POST') {
    const data = await readBody(req);
    fs.writeFileSync(path.join(dataDir, 'portfolio.json'), JSON.stringify(data, null, 2));
    return send(res, { ok: true });
  }

  // ── read-data ──
  if (url === '/api/read-data' && req.method === 'POST') {
    const fp = path.join(dataDir, 'portfolio.json');
    if (!fs.existsSync(fp)) return send(res, { ok: false });
    const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
    return send(res, { ok: true, data });
  }

  // ── reset-data: re-read original version from git ──
  if (url === '/api/reset-data' && req.method === 'POST') {
    const original = path.join(ROOT, 'public', 'data', 'portfolio.json');
    if (!fs.existsSync(original)) return send(res, { ok: false, message: 'No original data found' });
    const data = JSON.parse(fs.readFileSync(original, 'utf-8'));
    return send(res, { ok: true, data });
  }

  // ── upload-image ──
  if (url === '/api/upload-image' && req.method === 'POST') {
    const { filename, data: b64 } = await readBody(req);
    const m = b64.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!m) return send(res, { ok: false }, 400);
    const name = (filename || 'img-' + Date.now() + '.' + m[1]).replace(/[^a-zA-Z0-9._-]/g, '_');
    fs.writeFileSync(path.join(assetsDir, name), Buffer.from(m[2], 'base64'));
    return send(res, { ok: true, path: '/assets/' + name, filename: name });
  }

  // ── git-info ──
  if (url === '/api/git-info' && req.method === 'POST') {
    const branch = git('git branch --show-current') || 'unknown';
    const status = git('git status --porcelain') || '';
    const modified = status ? status.split('\n').filter(l => l.trim()).length : 0;
    const remoteUrl = git('git remote get-url origin');
    const gitUser = git('git config user.name');
    const gitEmail = git('git config user.email');
    return send(res, { ok: true, branch, modified, remoteUrl: remoteUrl || null, gitUser: gitUser || null, gitEmail: gitEmail || null });
  }

  // ── git-commit ──
  if (url === '/api/git-commit' && req.method === 'POST') {
    const body = await readBody(req);
    const msg = body.message || 'Update portfolio ' + new Date().toISOString();
    const logs = [];
    logs.push({ cmd: 'git add -A', ...gitWithOutput('git add -A') });
    const diffCheck = gitWithOutput('git diff --cached --quiet');
    if (diffCheck.ok) return send(res, { ok: true, message: 'Nothing to commit', logs });
    const commitResult = gitWithOutput('git commit -m "' + msg.replace(/"/g, '\\"') + '"');
    logs.push({ cmd: 'git commit', ...commitResult });
    return send(res, { ok: commitResult.ok, message: commitResult.ok ? 'Committed!' : 'Commit failed', logs });
  }

  // ── git-push ──
  if (url === '/api/git-push' && req.method === 'POST') {
    const body = await readBody(req);
    const branch = body.branch || 'main';
    const pushResult = gitWithOutput('git push origin ' + branch);
    const logs = [{ cmd: 'git push origin ' + branch, ...pushResult }];
    return send(res, { ok: pushResult.ok, message: pushResult.ok ? 'Pushed to origin/' + branch : 'Push failed', logs });
  }

  send(res, { error: 'Not found' }, 404);
});

server.listen(PORT, () => console.log('[admin-server] http://localhost:' + PORT));
