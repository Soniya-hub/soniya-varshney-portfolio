import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Copy, Check, Send, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 26 },
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

      // Form card animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: '6vw', rotateZ: 1 },
        {
          opacity: 1,
          x: 0,
          rotateZ: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Input fields animation
      const inputs = formRef.current?.querySelectorAll('.form-field');
      if (inputs) {
        gsap.fromTo(
          inputs,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('varshneysoniya0987@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSending(true);

  emailjs
    .send(
      'service_rjdbkfj',
      'template_e1hdmbp',
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      'LH9Z4ZZZyY2ORtqHb'
    )
    .then(() => {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    })
 .catch((error: unknown) => {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.');
    })
    .finally(() => {
      setSending(false);
    });
};

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-navy-light py-[10vh] px-[7vw]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[6vw]">
          {/* Left Column */}
          <div ref={leftRef}>
            <span className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-violet mb-4">
              Contact
            </span>
            <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,48px)] text-foreground mb-6 leading-tight">
              Let&apos;s build
              <br />
              something great.
            </h2>
            <p className="text-base text-muted-foreground mb-6 max-w-md">
              Available for freelance engagements — CRM tools, automation systems, fintech dashboards, SaaS backends, and WordPress sites. Drop me a message and I'll get back within 24 hours.
            </p>

            {/* Freelance Services Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['CRM / SaaS', 'Automation', 'Spring Boot APIs', 'React Frontends', 'WordPress'].map((s) => (
                <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-violet/10 border border-violet/25 rounded-full text-xs font-mono text-violet">
                  <Zap className="w-3 h-3" />
                  {s}
                </span>
              ))}
            </div>

            {/* Email */}
            <div className="mb-8">
              <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-3">
                Email
              </p>
              <button
                onClick={copyEmail}
                className="flex items-center gap-3 group min-w-0 max-w-full"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet/10 text-violet group-hover:bg-violet group-hover:text-white transition-all flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm text-foreground group-hover:text-violet transition-colors min-w-0 break-all">
                  varshneysoniya0987@gmail.com
                </span>
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-card text-muted-foreground group-hover:text-violet transition-colors">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </div>
              </button>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-3">
                Connect & Hire
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/Soniya-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-card border border-border text-muted-foreground hover:text-violet hover:border-violet/50 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/soniya-varshney-49071a1b8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-card border border-border text-muted-foreground hover:text-violet hover:border-violet/50 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.upwork.com/freelancers/~soniyavarshney"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hire on Upwork"
                  className="h-12 px-4 flex items-center gap-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-violet hover:border-violet/50 transition-all text-xs font-mono"
                >
                  Upwork
                </a>
                <a
                  href="https://www.fiverr.com/soniyavarshney"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hire on Fiverr"
                  className="h-12 px-4 flex items-center gap-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-violet hover:border-violet/50 transition-all text-xs font-mono"
                >
                  Fiverr
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef}>
            <div className="bg-navy rounded-2xl p-6 md:p-8 card-shadow">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-field">
                  <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-violet focus:ring-violet/20"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-violet focus:ring-violet/20"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project — what you need built, your timeline, budget..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-violet focus:ring-violet/20 min-h-[120px] resize-none"
                    required
                  />
                </div>
               <Button
  type="submit"
  disabled={sending}
  className="w-full bg-violet hover:bg-violet-dark text-white py-5 rounded-xl text-sm font-medium transition-all hover:shadow-glow disabled:opacity-60"
>
  {sending ? 'Sending…' : 'Send Message'}
  <Send className="ml-2 w-4 h-4" />
</Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Soniya Varshney. Built with care.
          </p>
        </div>
      </div>
    </section>
  );
}
