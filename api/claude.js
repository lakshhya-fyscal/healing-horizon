import crypto from 'crypto';

function verifyToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const lastColon = decoded.lastIndexOf(':');
    if (lastColon === -1) return false;
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);

    const colonIdx = payload.lastIndexOf(':');
    if (colonIdx === -1) return false;
    const ts = payload.slice(colonIdx + 1);
    const age = Date.now() - parseInt(ts, 10);
    if (isNaN(age) || age > 24 * 60 * 60 * 1000) return false;

    const secret = process.env.AUTH_SECRET || 'dev-secret';
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (sig.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!verifyToken(token)) {
    return res.status(401).json({ error: { message: 'Unauthorized' } });
  }

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
}
