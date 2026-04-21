import crypto from 'crypto';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initDb } from './db.js';
import { authRouter } from './routes/auth.js';
import { assetsRouter } from './routes/assets.js';
import { generateRouter } from './routes/generate.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/generate', generateRouter);

app.get('/api/health', (_, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// GTM Studio login (validates against AUTH_USERS env var)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
  const usersJson = process.env.AUTH_USERS;
  if (!usersJson) return res.status(500).json({ error: 'AUTH_USERS not configured' });
  let users;
  try { users = JSON.parse(usersJson); } catch { return res.status(500).json({ error: 'AUTH_USERS misconfigured' }); }
  const user = users.find(u => u.email === email.trim().toLowerCase() && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });
  const secret = process.env.AUTH_SECRET || 'dev-secret';
  const ts = Date.now().toString();
  const payload = `${user.email}:${ts}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const token = Buffer.from(`${payload}:${sig}`).toString('base64');
  res.json({ token, email: user.email, name: user.name, role: user.role });
});

// Unauthenticated proxy for the standalone Content Studio HTML
app.post('/api/claude', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: { message: 'ANTHROPIC_API_KEY not configured' } });
  }
  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

// Serve built frontend in production
if (process.env.NODE_ENV === 'production') {
  const dist = join(__dirname, '../dist');
  app.use(express.static(dist));
  app.get('*', (_, res) => res.sendFile(join(dist, 'index.html')));
}

await initDb();
app.listen(PORT, () => console.log(`API server running at http://localhost:${PORT}`));
