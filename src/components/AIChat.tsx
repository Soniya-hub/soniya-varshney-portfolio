import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { PROFILE } from '@/data/knowledge';

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETING: Msg = {
  role: 'assistant',
  content:
    "Hi! I'm Sona, Soniya's AI assistant. Ask me anything about her skills, projects, or availability for freelance work. 👋",
};

const SUGGESTIONS = [
  'What are her AI skills?',
  'Tell me about her projects',
  'Is she available for hire?',
  'What is her experience?',
];

// Scripted fallback used when the serverless AI endpoint is unavailable
// (e.g. local dev or no API key configured yet).
function scriptedReply(question: string): string {
  const q = question.toLowerCase();

  if (/(ai|agent|prompt|llm|claude|gpt|automation)/.test(q)) {
    return `Soniya builds AI agents and automation systems — her AI toolkit includes ${PROFILE.skills.ai.join(', ')}. Her FreelanceOS platform uses AI proposal generation and automated client workflows. Want to know about a specific project?`;
  }
  if (/(skill|tech|stack|know|framework|language)/.test(q)) {
    return `Her core stack: ${PROFILE.skills.backend.slice(0, 4).join(', ')} on the backend; ${PROFILE.skills.frontend.slice(0, 4).join(', ')} on the frontend; ${PROFILE.skills.data.slice(0, 3).join(', ')} for data; plus ${PROFILE.skills.ai.slice(0, 3).join(', ')} for AI work.`;
  }
  if (/(project|built|portfolio|work|flwcrm|crm|freelanceos)/.test(q)) {
    return `Highlights: ${PROFILE.projects
      .slice(0, 3)
      .map((p) => `${p.name} — ${p.blurb.split('.')[0]}`)
      .join('. ')}. Scroll to the Projects section for case studies!`;
  }
  if (/(experience|year|optum|career|background|senior)/.test(q)) {
    return `${PROFILE.summary} Check the Experience section below for the full timeline.`;
  }
  if (/(hire|available|freelance|rate|contract|contact|email|reach)/.test(q)) {
    return `Yes — ${PROFILE.availability} The contact form at the bottom of this page is the fastest way to reach her.`;
  }
  if (/(cert|education|mba|degree)/.test(q)) {
    return `She holds an MBA in Finance and certifications including ${PROFILE.certifications.slice(0, 3).join(', ')}.`;
  }
  if (/(hi|hello|hey)\b/.test(q)) {
    return "Hello! Ask me about Soniya's skills, projects, experience, or availability for freelance work.";
  }
  return "I can tell you about Soniya's skills, projects, experience, and availability. For anything else, drop her a message via the contact form below!";
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Msg[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    let reply: string;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Exclude the canned greeting — conversation must start with a user turn
        body: JSON.stringify({ messages: nextMessages.slice(1) }),
      });
      if (res.ok) {
        const data = await res.json();
        reply = data.reply;
      } else if (res.status === 429) {
        reply = "I'm getting a lot of questions right now — give me a few seconds and try again!";
      } else {
        reply = scriptedReply(trimmed);
      }
    } catch {
      reply = scriptedReply(trimmed);
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-violet hover:bg-violet-dark text-white card-shadow transition-all hover:scale-105"
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        {!open && <span className="text-sm font-medium hidden sm:inline">Ask AI about me</span>}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 left-4 right-4 sm:left-6 sm:right-auto z-50 sm:w-[380px] max-h-[70vh] flex flex-col bg-card border border-violet/30 rounded-2xl card-shadow overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-navy-light">
            <div className="w-8 h-8 rounded-full bg-violet/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-violet" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Sona — AI Assistant</p>
              <p className="text-[11px] text-muted-foreground">
                Ask about Soniya's work & availability
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[240px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-violet text-white rounded-br-md'
                      : 'bg-navy-light text-foreground border border-border rounded-bl-md'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-navy-light border border-border">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestion chips (only before first user message) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-3 py-1.5 rounded-full text-xs font-mono border border-violet/30 text-violet hover:bg-violet hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-3 py-3 border-t border-border"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              maxLength={500}
              className="flex-1 bg-navy-light border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-violet hover:bg-violet-dark disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
