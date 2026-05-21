import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Cert = {
  title: string;
  issuer: string;
  year: string;
  badge?: string;
  link?: string;
};

const certifications: Cert[] = [
  {
    title: 'Java (Core & Advanced)',
    issuer: 'INCAPP',
    year: '2021',
  },
  {
    title: 'Creative Certificate & Campaign Manager Certification',
    issuer: 'Google',
    year: '2022',
  },
  {
    title: 'Business English Certificate',
    issuer: 'Cambridge Assessment English',
    year: '2022',
  },
  {
    title: 'UiPath RPA Developer Foundation',
    issuer: 'UiPath',
    year: '2022',
  },
  {
    title: 'Agile Fundamentals: Scrum & Kanban',
    issuer: 'Udemy',
    year: '2022',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.cert-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.07,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
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
      id="certifications"
      className="relative w-full bg-navy-light py-[10vh] px-[7vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-violet mb-4">
            Certifications
          </span>
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,48px)] text-foreground mb-4">
            Credentials & Learning
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Courses and certifications that shaped my technical foundation.
          </p>
        </div>

        {/* Certs Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="cert-card group bg-card rounded-2xl p-5 card-shadow border border-transparent hover:border-violet/30 transition-all flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-violet" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-sm text-foreground mb-1 leading-tight group-hover:text-violet transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {cert.issuer} · {cert.year}
                </p>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${cert.title} certificate`}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-violet hover:underline"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
