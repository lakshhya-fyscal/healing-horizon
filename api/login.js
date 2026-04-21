import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

  const usersJson = process.env.AUTH_USERS;
  if (!usersJson) return res.status(500).json({ error: 'AUTH_USERS not configured' });

  let users;
  try { users = JSON.parse(usersJson); }
  catch { return res.status(500).json({ error: 'AUTH_USERS misconfigured' }); }

  const user = users.find(
    u => u.email === email.trim().toLowerCase() && u.password === password
  );
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const secret = process.env.AUTH_SECRET || 'dev-secret';
  const ts = Date.now().toString();
  const payload = `${user.email}:${ts}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const token = Buffer.from(`${payload}:${sig}`).toString('base64');

  res.json({ token, email: user.email, name: user.name, role: user.role });
}
