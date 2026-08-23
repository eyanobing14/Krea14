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
    return send(res, { ok: true, branch, modified, remoteUrl: remoteUrl || null });
  }

  // ── git-commit ──
  if (url === '/api/git-commit' && req.method === 'POST') {
    const body = await readBody(req);
    const msg = body.message || 'Update portfolio ' + new Date().toISOString();
    git('git add -A');
    try { git('git diff --cached --quiet'); return send(res, { ok: true, message: 'Nothing to commit' }); } catch (_) {}
    git('git commit -m "' + msg.replace(/"/g, '\\"') + '"');
    return send(res, { ok: true, message: 'Committed!' });
  }

  // ── git-push ──
  if (url === '/api/git-push' && req.method === 'POST') {
    const body = await readBody(req);
    const branch = body.branch || 'main';
    git('git push origin ' + branch);
    return send(res, { ok: true, message: 'Pushed to origin/' + branch });
  }

  send(res, { error: 'Not found' }, 404);
});

server.listen(PORT, () => console.log('[admin-server] http://localhost:' + PORT));
