import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '../src/data/knowledge';

const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-4-8';
const MAX_HISTORY = 20;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    // Signals the client to use its scripted fallback
    return res.status(503).json({ error: 'AI not configured' });
  }

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const history: Anthropic.MessageParam[] = messages
    .slice(-MAX_HISTORY)
    .filter(
      (m: { role?: string; content?: string }) =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length > 0 &&
        m.content.length <= 2000
    )
    .map((m: { role: 'user' | 'assistant'; content: string }) => ({
      role: m.role,
      content: m.content,
    }));

  if (history.length === 0 || history[0].role !== 'user') {
    return res.status(400).json({ error: 'conversation must start with a user message' });
  }

  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: buildSystemPrompt(),
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: history,
    });

    if (response.stop_reason === 'refusal') {
      return res.status(200).json({
        reply: "Sorry, I can't help with that one — but I'm happy to answer anything about Soniya's work!",
      });
    }

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('');

    return res.status(200).json({ reply: text });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'Too many requests — try again shortly' });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(503).json({ error: 'AI not configured' });
    }
    console.error('chat error:', err);
    return res.status(500).json({ error: 'AI temporarily unavailable' });
  }
}
