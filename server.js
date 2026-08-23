import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4200;
const ROOT = __dirname;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const dataDir = path.join(ROOT, 'public', 'data');
const assetsDir = path.join(ROOT, 'public', 'assets');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

function git(cmd) {
  try { return execSync(cmd, { cwd: ROOT, stdio: 'pipe' }).toString().trim(); }
  catch (_) { return null; }
}

// ── Save data ──
app.post('/api/save-data', (req, res) => {
  try {
    fs.writeFileSync(path.join(dataDir, 'portfolio.json'), JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

// ── Read data ──
app.get('/api/read-data', (req, res) => {
  try {
    const fp = path.join(dataDir, 'portfolio.json');
    if (!fs.existsSync(fp)) return res.json({ ok: false });
    res.json({ ok: true, data: JSON.parse(fs.readFileSync(fp, 'utf-8')) });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

// ── Upload image ──
app.post('/api/upload-image', (req, res) => {
  try {
    const { filename, data: b64 } = req.body;
    const m = b64.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!m) return res.status(400).json({ ok: false });
    const name = (filename || `img-${Date.now()}.${m[1]}`).replace(/[^a-zA-Z0-9._-]/g, '_');
    fs.writeFileSync(path.join(assetsDir, name), Buffer.from(m[2], 'base64'));
    res.json({ ok: true, path: `/assets/${name}`, filename: name });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

// ── Git status + remote (combined) ──
app.get('/api/git-info', (req, res) => {
  const branch = git('git branch --show-current') || 'unknown';
  const status = git('git status --porcelain') || '';
  const modified = status ? status.split('\n').filter(l => l.trim()).length : 0;
  const remoteUrl = git('git remote get-url origin');
  res.json({ ok: true, branch, modified, remoteUrl: remoteUrl || null });
});

// ── Git commit ──
app.post('/api/git-commit', (req, res) => {
  try {
    const msg = req.body.message || `Update portfolio ${new Date().toISOString()}`;
    git('git add -A');
    if (git('git diff --cached --quiet') !== null) return res.json({ ok: true, message: 'Nothing to commit' });
    git(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
    res.json({ ok: true, message: 'Committed!' });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

// ── Git push ──
app.post('/api/git-push', (req, res) => {
  try {
    const branch = req.body.branch || 'main';
    git(`git push origin ${branch}`);
    res.json({ ok: true, message: `Pushed to origin/${branch}` });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.listen(PORT, () => console.log(`[admin-server] http://localhost:${PORT}`));
