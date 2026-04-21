import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { redis } from '../redis.js';

export const generateRouter = Router();
generateRouter.use(requireAuth);

generateRouter.post('/', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set on server' });
  }

  // Rate limit: 10 requests per minute per user
  const rKey = `ratelimit:generate:${req.user.id}`;
  const count = await redis.incr(rKey);
  if (count === 1) await redis.expire(rKey, 60);
  if (count > 10) {
    return res.status(429).json({ error: 'Rate limit exceeded. Wait a moment before generating again.' });
  }

  const { prompt, webSearch } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt required' });

  const body = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  };

  if (webSearch) {
    body.tools = [{ type: 'web_search_20250305', name: 'web_search' }];
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(502).json({ error: data.error.message });
    }

    const textBlock = data.content?.find(b => b.type === 'text');
    if (!textBlock) {
      return res.status(502).json({ error: 'No text content returned from model' });
    }

    res.json({ text: textBlock.text });
  } catch (err) {
    console.error('Generation error:', err);
    res.status(500).json({ error: 'Generation failed: ' + err.message });
  }
});
