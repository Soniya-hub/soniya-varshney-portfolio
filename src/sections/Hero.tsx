import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Github, Linkedin, Moon, Sun, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Nav entrance
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.4 },
        0
      );

      // Headline words stagger
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        tl.fromTo(
          headlineWords,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
          0.1
        );
      }

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.4 },
        0.45
      );

      // Hero image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: '10vw', rotateZ: 1 },
        { opacity: 1, x: 0, rotateZ: 0, duration: 0.7 },
        0.35
      );

      // Pills entrance
      const pills = pillsRef.current?.querySelectorAll('.pill');
      if (pills) {
        tl.fromTo(
          pills,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          0.7
        );
      }

      // Scroll-driven animation (pinned)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: window.innerWidth >= 1024,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, imageRef.current, ctaRef.current, pillsRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // ENTRANCE (0-30%): subtle adjustments
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-2vw' },
        { x: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        imageRef.current,
        { x: '2vw' },
        { x: 0, ease: 'none' },
        0
      );

      // EXIT (70-100%): elements exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1, scale: 1 },
        { x: '28vw', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        pillsRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
  <section
    ref={sectionRef}
    id="hero"
    className="relative w-full min-h-screen lg:h-screen bg-navy overflow-hidden"
  >
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-radial" />

    {/* Navigation */}
    <nav
      ref={navRef}
      className="absolute top-0 left-0 right-0 h-[72px] z-50 flex items-center justify-between px-6 lg:px-[4vw]"
    >
      <div className="font-heading font-bold text-2xl text-foreground tracking-tight">
        SV.
      </div>
      <div className="flex items-center gap-4 lg:gap-6">
        <button onClick={() => scrollToSection('projects')} aria-label="Go to projects" className="nav-link">
          Work
        </button>
        <button onClick={() => scrollToSection('ai-agents')} aria-label="Go to AI agents" className="nav-link hidden md:inline">
          AI Agents
        </button>
        <button onClick={() => scrollToSection('about')} aria-label="Go to about" className="nav-link">
          About
        </button>
        <button onClick={() => scrollToSection('certifications')} aria-label="Go to certifications" className="nav-link hidden md:inline">
          Certs
        </button>
        <button onClick={() => scrollToSection('contact')} aria-label="Go to contact" className="nav-link">
          Contact
        </button>
        <a
          href="/Soniya_Varshney_Resume.pdf"
          download
          aria-label="Download Resume"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-violet/40 text-xs font-mono text-violet hover:bg-violet/10 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Resume
        </a>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="p-2 rounded-lg border border-border hover:border-violet/40 text-muted-foreground hover:text-foreground transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </nav>

    {/* ── MOBILE LAYOUT (hidden on lg+) ── */}
    <div className="lg:hidden relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-12">
      {/* Portrait photo — centered, larger */}
      <div className="w-[140px] h-[170px] rounded-2xl overflow-hidden ring-2 ring-violet/30 card-shadow mb-6">
        <img src="/hero_portrait.jpg" alt="Soniya Varshney" className="w-full h-full object-cover object-top" />
      </div>

      {/* Name */}
      <h1 className="font-heading font-bold text-foreground leading-[0.92] mb-3">
        <span className="block text-[clamp(36px,10vw,52px)]">Soniya</span>
        <span className="block text-[clamp(36px,10vw,52px)]">Varshney</span>
      </h1>

      {/* Role */}
      <p className="text-sm text-violet font-medium mb-4">
        Senior Software Engineer · AI Agents & Automation
      </p>

      {/* Bio */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-[320px]">
        5+ years building Java microservices, Spring Boot backends, and React/Next.js frontends.
        MBA Finance. I design AI agents and end-to-end automation systems for startups.
      </p>

      {/* CTA buttons */}
      <div className="flex gap-3 w-full mb-5">
        <Button
          onClick={() => scrollToSection('projects')}
          className="flex-1 bg-violet hover:bg-violet-dark text-white py-5 rounded-xl text-sm font-medium"
        >
          View My Work <ChevronDown className="ml-1.5 w-4 h-4" />
        </Button>
        <Button
          onClick={() => scrollToSection('contact')}
          variant="outline"
          className="flex-1 border-violet/40 text-violet hover:bg-violet hover:text-white py-5 rounded-xl text-sm font-medium"
        >
          Hire Me
        </Button>
      </div>

      {/* Pills */}
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        <span className="px-4 py-2 bg-card rounded-full text-xs font-mono text-muted-foreground border">
          5+ Years · MBA Finance
        </span>
        <span className="px-4 py-2 bg-violet/10 rounded-full text-xs font-mono text-violet border border-violet/30 animate-pulse-subtle">
          Available for Freelance
        </span>
      </div>

      {/* Social links */}
      <div className="flex gap-5">
        <a href="https://github.com/Soniya-hub" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="social-icon">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/soniya-varshney-49071a1b8" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="social-icon">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>

    {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
    <div className="hidden lg:block relative z-10 h-full">
      {/* LEFT CONTENT — single flow column, no overlapping absolute positions */}
      <div
        ref={headlineRef}
        className="absolute left-[7vw] top-[18vh] w-[44vw] max-w-[560px]"
      >
        <h1 className="font-heading font-bold text-foreground leading-[0.95] mb-4">
          <span className="word block text-[clamp(36px,6vw,64px)]">Soniya</span>
          <span className="word block text-[clamp(36px,6vw,64px)]">Varshney</span>
        </h1>
        <p className="word text-lg md:text-2xl text-violet font-medium mb-3">
          Senior Software Engineer · AI Agents & Automation
        </p>
        <p className="word text-base text-muted-foreground max-w-[420px] leading-relaxed mb-8">
          5+ years building Java microservices, Spring Boot backends, and React/Next.js frontends.
          MBA Finance. I design AI agents and end-to-end automation systems — AI proposals,
          client onboarding, and invoice pipelines for startups.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mb-5">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-violet hover:bg-violet-dark text-white px-6 py-5 rounded-xl text-sm font-medium"
            >
              View My Work
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-violet/40 text-violet hover:bg-violet hover:text-white px-6 py-5 rounded-xl text-sm font-medium transition-all"
            >
              Hire Me
            </Button>
          </div>
        </div>

        {/* Pills */}
        <div ref={pillsRef} className="flex gap-3 flex-wrap">
          <span className="pill px-4 py-2 bg-card rounded-full text-xs font-mono text-muted-foreground border">
            5+ Years · MBA Finance
          </span>
          <span className="pill px-4 py-2 bg-violet/10 rounded-full text-xs font-mono text-violet border border-violet/30 animate-pulse-subtle">
            Available for Freelance
          </span>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        ref={imageRef}
        className="absolute right-[7vw] top-[8vh] w-[30vw] h-[82vh] max-w-[400px] max-h-[620px]"
      >
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-b from-violet/30 to-transparent" />
        <div className="relative w-full h-full bg-card rounded-2xl card-shadow overflow-hidden">
          <div className="absolute top-4 left-4 w-3 h-3 bg-violet rounded-full animate-pulse-subtle z-10" />
          <img
            src="/hero_portrait.jpg"
            alt="Soniya Varshney"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-navy/50 to-transparent" />
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute bottom-8 right-[7vw] flex gap-6 z-20">
        <a href="https://github.com/Soniya-hub" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="social-icon">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/soniya-varshney-49071a1b8" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="social-icon">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  </section>
);}