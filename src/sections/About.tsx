import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, GraduationCap, Briefcase, Code, Brain, Plane, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickFacts = [
  { icon: MapPin, label: 'Location', value: 'India' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CS · MBA Finance' },
  { icon: Briefcase, label: 'Current', value: 'Senior Software Engineer @ Optum' },
  { icon: Code, label: 'Focus', value: 'Backend · Frontend · Automation · Fintech' },
];

const interests = [
  { icon: Brain, label: 'AI Automation' },
  { icon: Plane, label: 'System Design' },
  { icon: Palette, label: 'Fintech / SaaS' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Body paragraphs animation
      const paragraphs = bodyRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Card animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: '6vw', rotateZ: 1 },
        {
          opacity: 1,
          x: 0,
          rotateZ: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Interest chips animation
      const chips = interestsRef.current?.querySelectorAll('.interest-chip');
      if (chips) {
        gsap.fromTo(
          chips,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-navy py-[10vh] px-[7vw]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[6vw]">
          {/* Left Column */}
          <div>
            <span
              ref={labelRef}
              className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-violet mb-6"
            >
              About
            </span>
            <h2
              ref={headlineRef}
              className="font-heading font-bold text-[clamp(32px,3.6vw,48px)] text-foreground mb-8 leading-tight"
            >
              Engineer by day.
              <br />
              Builder by night.
            </h2>
            <div ref={bodyRef} className="space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                I’m Soniya — Senior Software Engineer at Optum (UnitedHealth Group) with 5+ years
                building Java microservices, Spring Boot backends, and React frontends at enterprise scale.
                I also hold an MBA in Finance.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Beyond my day job, I design and build end-to-end <span className="text-foreground font-medium">freelance automation systems</span> for
                startups and solo professionals — AI-powered proposal generation, client onboarding flows,
                PDF invoice automation, and CRM portals — so founders can run their business on autopilot.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                I’ve contributed to enterprise applications used by millions, focusing on reliability,
                clean architecture, and production stability. Currently available for freelance engagements
                in fintech, SaaS, and startup automation.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                I care about shipping software that lasts — performant, accessible, and maintainable.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:pt-16">
            {/* Quick Facts Card */}
            <div
              ref={cardRef}
              className="bg-card rounded-2xl p-6 md:p-8 card-shadow border-t-2 border-violet"
            >
              <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
                Quick Facts
              </h3>
              <div className="space-y-5">
                {quickFacts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet/10 text-violet flex-shrink-0">
                      <fact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-1">
                        {fact.label}
                      </p>
                      <p className="text-sm text-foreground">{fact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div ref={interestsRef} className="mt-8">
              <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-4">
                Interests
              </p>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="interest-chip flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border hover:border-violet/50 transition-colors cursor-default"
                  >
                    <interest.icon className="w-4 h-4 text-violet" />
                    <span className="text-sm text-foreground">{interest.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
