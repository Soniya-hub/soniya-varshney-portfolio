import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Backend',
    skills: ['Java', 'Spring Boot', 'Hibernate', 'REST APIs', 'Microservices', 'Node.js', 'JUnit', 'JSP'],
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Angular', 'JavaScript (ES6+)', 'HTML5/CSS3', 'TailwindCSS', 'WordPress'],
  },
  {
    title: 'AI & Agents',
    skills: ['AI Agents', 'Agentic AI', 'Prompt Engineering', 'Claude API', 'OpenAI API', 'Workflow Automation'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'Supabase', 'Oracle', 'SQL Server'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['GCP', 'AWS', 'Docker', 'Jenkins', 'GitHub Actions', 'CI/CD', 'Git'],
  },
  {
    title: 'Business & Finance',
    skills: ['MBA Finance', 'Financial Modelling', 'Cost-Benefit Analysis', 'Client Management', 'Agile/Scrum'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Chips animation
      const chips = cardsRef.current?.querySelectorAll('.skill-chip');
      if (chips) {
        gsap.fromTo(
          chips,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.02,
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
      id="skills"
      className="relative w-full bg-navy py-[10vh] px-[7vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-violet mb-4">
            Skills
          </span>
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,48px)] text-foreground mb-4">
            Tech Stack
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Languages, frameworks, and tools I use to ship.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card bg-card rounded-2xl p-6 card-shadow border-t-2 border-violet/50 hover:border-violet transition-colors"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="skill-chip px-3 py-1.5 bg-navy-light rounded-full text-sm text-foreground border border-border hover:border-violet/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
