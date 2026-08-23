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

// ── Save portfolio data ──
app.post('/api/save-data', (req, res) => {
  try {
    const filePath = path.join(dataDir, 'portfolio.json');
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ ok: true, path: 'public/data/portfolio.json' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Read data ──
app.get('/api/read-data', (req, res) => {
  try {
    const filePath = path.join(dataDir, 'portfolio.json');
    if (!fs.existsSync(filePath)) return res.status(404).json({ ok: false });
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Upload image ──
app.post('/api/upload-image', (req, res) => {
  try {
    const { filename, data: base64Data } = req.body;
    const match = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!match) return res.status(400).json({ ok: false, error: 'Invalid base64' });
    const ext = match[1];
    const buffer = Buffer.from(match[2], 'base64');
    const name = (filename || `img-${Date.now()}.${ext}`).replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = path.join(assetsDir, name);
    fs.writeFileSync(filePath, buffer);
    res.json({ ok: true, path: `/assets/${name}`, filename: name });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Git commit ──
app.post('/api/git-commit', (req, res) => {
  try {
    const msg = req.body.message || `Update portfolio ${new Date().toISOString()}`;
    execSync('git add -A', { cwd: ROOT, stdio: 'pipe' });
    try {
      execSync('git diff --cached --quiet', { cwd: ROOT, stdio: 'pipe' });
      return res.json({ ok: true, message: 'Nothing to commit' });
    } catch (_) {}
    execSync(`git commit -m "${msg.replace(/"/g, '\\"')}"`, { cwd: ROOT, stdio: 'pipe' });
    res.json({ ok: true, message: 'Committed!' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Git push ──
app.post('/api/git-push', (req, res) => {
  try {
    const branch = req.body.branch || 'main';
    execSync(`git push origin ${branch}`, { cwd: ROOT, stdio: 'pipe', timeout: 30000 });
    res.json({ ok: true, message: `Pushed to origin/${branch}` });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Git status ──
app.get('/api/status', (req, res) => {
  try {
    const branch = execSync('git branch --show-current', { cwd: ROOT, stdio: 'pipe' }).toString().trim();
    const status = execSync('git status --porcelain', { cwd: ROOT, stdio: 'pipe' }).toString().trim();
    const modified = status ? status.split('\n').filter(l => l.trim()).length : 0;
    res.json({ ok: true, branch, modified });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[admin-server] http://localhost:${PORT}`);
});
