import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, FileText, Mail, Receipt, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const agents = [
  {
    icon: FileText,
    name: 'Proposal Agent',
    description:
      'Reads a client brief and drafts a tailored project proposal — scope, timeline, and pricing — in seconds instead of hours.',
    pipeline: ['Client brief', 'LLM analysis', 'Draft proposal', 'Human review'],
    tech: ['Claude API', 'Prompt Engineering', 'Spring Boot'],
  },
  {
    icon: Mail,
    name: 'Onboarding Agent',
    description:
      'Automates the entire client onboarding journey — welcome emails, document collection, kickoff scheduling — with zero manual steps.',
    pipeline: ['New client', 'Email sequence', 'Docs collected', 'Kickoff booked'],
    tech: ['JavaMail', 'Spring @Scheduled', 'Workflow Automation'],
  },
  {
    icon: Receipt,
    name: 'Invoice Agent',
    description:
      'Generates branded PDF invoices, sends them on schedule, and chases overdue payments with polite automated follow-ups.',
    pipeline: ['Work logged', 'PDF generated', 'Invoice sent', 'Follow-up loop'],
    tech: ['iText PDF', 'Cron Scheduling', 'MySQL'],
  },
];

const DEMO_PLACEHOLDER =
  'e.g. I need a booking system for my yoga studio with online payments and reminders...';

function fallbackProposal(brief: string): string {
  const trimmed = brief.length > 120 ? brief.slice(0, 120) + '…' : brief;
  return `📋 PROJECT PROPOSAL (draft)

Understanding: You need — "${trimmed}"

Suggested approach:
1. Discovery call to lock down scope & priorities (week 1)
2. Core build — backend APIs + responsive frontend (weeks 2–4)
3. Automation & AI integrations where they save you time (week 5)
4. Testing, deployment & handover with docs (week 6)

Stack: React/Next.js · Spring Boot or Node.js · PostgreSQL/Supabase · deployed on Vercel/GCP

Next step: send this brief via the contact form and Soniya will reply with a detailed quote within 24h.

(Live AI generation activates once the site's AI backend is configured — this draft came from the built-in template.)`;
}

export default function AIAgents() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const [brief, setBrief] = useState('');
  const [proposal, setProposal] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.agent-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        demoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: demoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const generate = async () => {
    const trimmed = brief.trim();
    if (!trimmed || generating) return;
    setGenerating(true);
    setProposal('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `You are demoing Soniya's Proposal Agent. Write a short, punchy freelance project proposal (max 150 words) for this client brief: "${trimmed}". Include: understanding of the need, a 3-4 step approach with rough timeline, a suggested tech stack from Soniya's skills, and a call to action to contact her via the form on this page.`,
            },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setProposal(data.reply);
      } else {
        setProposal(fallbackProposal(trimmed));
      }
    } catch {
      setProposal(fallbackProposal(trimmed));
    }
    setGenerating(false);
  };

  return (
    <section
      ref={sectionRef}
      id="ai-agents"
      className="relative w-full bg-navy py-[10vh] px-[7vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-violet mb-4">
            AI Agents
          </span>
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,48px)] text-foreground mb-4">
            Automation That Works While You Sleep
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            AI agents I design and build for founders and freelancers — from first client
            message to final invoice, on autopilot.
          </p>
        </div>

        {/* Agent Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="agent-card group bg-card rounded-2xl p-6 card-shadow border border-transparent hover:border-violet/30 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-violet/10 flex items-center justify-center mb-4 group-hover:bg-violet/20 transition-colors">
                <agent.icon className="w-5 h-5 text-violet" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {agent.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {agent.description}
              </p>

              {/* Pipeline visual */}
              <div className="flex items-center flex-wrap gap-1 mb-4">
                {agent.pipeline.map((step, i) => (
                  <span key={step} className="flex items-center gap-1">
                    <span className="px-2 py-1 bg-navy-light rounded-md text-[10px] font-mono text-muted-foreground border border-border">
                      {step}
                    </span>
                    {i < agent.pipeline.length - 1 && (
                      <span className="text-violet text-xs">›</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {agent.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-violet/10 rounded-full text-[11px] font-mono text-violet border border-violet/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Live Demo */}
        <div
          ref={demoRef}
          className="bg-card rounded-2xl card-shadow border border-violet/20 p-6 md:p-8 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-violet/15 flex items-center justify-center">
              <Bot className="w-5 h-5 text-violet" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                Try the Proposal Agent — live
              </h3>
              <p className="text-xs text-muted-foreground">
                Describe your project and watch an AI draft a proposal instantly.
              </p>
            </div>
          </div>

          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder={DEMO_PLACEHOLDER}
            rows={3}
            maxLength={500}
            className="w-full mt-4 bg-navy-light border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet/50 resize-none"
          />

          <Button
            onClick={generate}
            disabled={!brief.trim() || generating}
            className="mt-3 bg-violet hover:bg-violet-dark text-white rounded-xl"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" /> Generate Proposal
              </>
            )}
          </Button>

          {proposal && (
            <div className="mt-5 bg-navy-light border border-violet/20 rounded-xl p-5 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {proposal}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
