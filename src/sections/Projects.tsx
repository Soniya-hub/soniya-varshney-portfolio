import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);
type CaseStudy = {
  role: string;
  type: string;
  overview: string;
  contributions: string[];
  impact: string;
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
  caseStudy?: CaseStudy;
};
const projects: Project[] = [
  {
    title: 'Ripple NDT — Tax Invoicing & Job Management System',
    description:
      'Production web app for a marine/vessel NDT inspection company: full job lifecycle from registration through GST-compliant invoicing, payment tracking, and role-based access. Delivered as subcontractor, end-to-end.',
    tech: ['Next.js 16', 'Prisma 7', 'PostgreSQL', 'Supabase', 'Tailwind CSS v4'],
    image: '/project_insurance.jpg',
    caseStudy: {
      role: 'Full-Stack Contractor',
      type: 'Subcontract — Ripple NDT (Marine/Vessel Inspection)',
      overview:
        'A production application built for Ripple NDT to manage the full lifecycle from job registration through GST-compliant invoicing and payment tracking. Worked as a subcontractor delivering the MVP end-to-end: schema design, API layer, UI, and test coverage.',
      contributions: [
        'Job registration and tracking, including Work Completion Certificate (WCC) upload/versioning via Supabase Storage with signed, time-limited URLs',
        'Tax Invoice and Proforma Invoice creation with an admin-extensible invoice-type catalog, GST breakup (CGST/SGST/IGST) computed in exact Decimal arithmetic to avoid floating-point rounding errors',
        'Payment tracking with automatic advance carry-forward from Proforma to Tax Invoice, including race-safe handling of concurrent payments',
        'Role-based access control (Admin, Accountant, Job Staff, Director) enforced at both middleware and route level, with a PIN-gated financial summary view separate from role permissions',
        'Defense-in-depth permission model — every write route independently re-validates access rather than trusting the middleware gate alone',
        'Deferred/staged file uploads (PDF, WCC certificates) that only commit to storage on successful save, with concurrent, independently-recoverable upload attempts',
        'Customer database, Excel export, dark mode, and a fully mobile-responsive UI',
        '170+ unit/integration tests (Vitest) and 60+ end-to-end tests (Playwright) covering every role\'s permission boundaries, not just the happy path',
      ],
      impact:
        'Delivered a production-ready MVP through iterative client feedback cycles — UI reworks, permission-scoping fixes, and schema evolution without breaking existing data.',
    },
  },
  {
    title: 'FlwCRM — SaaS CRM Platform',
    description:
      'Full-stack SaaS CRM for sales teams and businesses: lead pipeline management, task tracking, analytics dashboards, admin panel, and JWT-based role access. Live and deployed.',
    tech: ['React.js', 'Spring Boot', 'PostgreSQL', 'JWT', 'TailwindCSS', 'Vercel', 'Render'],
    image: '/project_release_tool.jpg',
    link: 'https://flwcrm.vercel.app/login',
    github: 'https://github.com/Soniya-hub/flwcrm',
    caseStudy: {
      role: 'Full Stack Developer & Product Owner',
      type: 'Personal SaaS Build — Live at flwcrm.vercel.app',
      overview:
        'FlwCRM is a production-grade SaaS CRM platform built for sales teams and small businesses — covering the full lead lifecycle from acquisition to conversion, with real-time analytics and multi-user support.',
      contributions: [
        'End-to-end lead management with CRUD, search, filter by status, and assignment',
        'Task management with priority levels, status tracking, and overdue detection',
        'Analytics dashboard — revenue metrics, lead distribution, pipeline performance charts',
        'Admin panel with user management, role-based access (Admin / User), and activity logs',
        'JWT authentication with protected REST endpoints and permission hierarchy',
        'Deployed frontend on Vercel + backend on Render with full CI/CD pipeline',
      ],
      impact: 'Live product serving real users — demonstrates ability to design, build, and ship a complete SaaS from scratch.',
    },
  },
  {
    title: 'FreelanceOS — Automation Platform',
    description:
      'End-to-end freelance automation system: AI proposal generation (OpenAI), client onboarding flows, PDF invoice automation, follow-up scheduler, and admin + client portals.',
    tech: ['Spring Boot', 'React.js', 'MySQL', 'OpenAI API', 'JavaMail', 'iText PDF', 'GCP'],
    image: '/project_covid.jpg',
    caseStudy: {
      role: 'Full Stack Developer & Architect',
      type: 'Personal Build (In Progress)',
      overview:
        'A full-stack automation platform that lets freelancers and startups run their business on autopilot — from the first client message to the final invoice — powered by Spring Boot, React.js, and OpenAI.',
      contributions: [
        'AI proposal generator using OpenAI API with prompt engineering',
        'Client onboarding flows with automated email sequences (JavaMail)',
        'PDF invoice generation with iText and scheduled follow-ups (Spring @Scheduled)',
        'Role-based access: Admin (freelancer) and Client portal',
        'Deployed on GCP with CI/CD pipeline',
      ],
      impact: 'Enables founders and solo professionals to eliminate admin overhead and focus on growth.',
    },
  },
  {
    title: 'Release Management Tool',
    description:
      'Enterprise internal tool replacing SharePoint release workflows at Optum — approval lifecycle, audit compliance, JWT auth, and React.js portal used across large engineering teams.',
    tech: ['Java', 'Spring Boot', 'Node.js', 'React.js', 'Bootstrap', 'JWT', 'REST APIs'],
    image: '/project_release_tool.jpg',
    caseStudy: {
      role: 'Full Stack Developer',
      type: 'Enterprise — Optum / UnitedHealth Group',
      overview:
        'An internal release management system built to automate release approvals, replace manual SharePoint workflows, and ensure audit compliance for enterprise-scale deployments.',
      contributions: [
        'Designed and implemented release approval workflows in Java Spring Boot',
        'Built Node.js REST microservices for async operations alongside core Java services',
        'Redesigned internal portal UI with React.js and Bootstrap for better responsiveness',
        'Implemented JWT auth, input validation, and structured logging',
        'Drove 25% increase in project throughput and 40% improvement in customer satisfaction',
      ],
      impact: 'Resolved 100+ production issues; boosted application reliability and user satisfaction by 30%.',
    },
  },
  {
    title: 'InvestorVault',
    description:
      'RBAC-based investor management portal with compound/simple interest calculators, task tracking, lead dashboards, and paginated data views.',
    tech: ['React.js', 'Spring Boot', 'MySQL', 'REST APIs', 'JWT'],
    image: '/project_insurance.jpg',
    link: 'https://github.com/Soniya-hub',
  },
  {
    title: 'Auto Insurance Platform',
    description:
      'Scalable enterprise insurance management system — end-to-end policy lifecycle, claims workflows, and admin dashboards.',
    tech: ['Java', 'Angular', 'Spring Boot', 'MySQL', 'REST APIs'],
    image: '/project_insurance.jpg',
    link: 'https://github.com/Soniya-hub/auto-insurance-platform',
  },
  {
    title: 'WordPress Business Website',
    description:
      'SEO-optimised business website for a finance company — Elementor Pro, lead capture, Google Analytics, fully responsive.',
    tech: ['WordPress', 'Elementor', 'SEO'],
    image: '/project_wordpress.jpg',
    link: 'https://www.vamcapital.in/',
  },
];

const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tech)))];

export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.tech.includes(activeFilter));

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
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, rotateZ: -0.5 },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            duration: 0.7,
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Thumbnails animation
      const thumbnails = cardsRef.current?.querySelectorAll('.project-thumbnail');
      if (thumbnails) {
        gsap.fromTo(
          thumbnails,
          { scale: 1.04, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Tech chips animation
      const chips = cardsRef.current?.querySelectorAll('.tech-chip');
      if (chips) {
        gsap.fromTo(
          chips,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.03,
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
  useEffect(() => {
  if (activeCaseStudy) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [activeCaseStudy]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-navy py-[10vh] px-[7vw]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-violet mb-4">
            Projects
          </span>
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,48px)] text-foreground mb-4">
            Selected Work
          </h2>
          <p className="text-base text-muted-foreground max-w-md">
            A few things I&apos;ve built — from enterprise tools to experiments.
          </p>

          {/* Tech Filter */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-nowrap md:flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                  activeFilter === tag
                    ? 'bg-violet text-white border-violet'
                    : 'border-border text-muted-foreground hover:border-violet/40 hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="project-card group bg-card rounded-2xl overflow-hidden card-shadow hover:border-violet/30 border border-transparent transition-all"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-thumbnail w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-violet transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="tech-chip px-2.5 py-1 bg-navy-light rounded-md text-xs font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link Buttons */}
                <div className="flex gap-2">
                  {project.caseStudy && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-violet/30 text-violet hover:bg-violet hover:text-white transition-all ${project.link || project.github ? 'flex-1' : 'w-full'}`}
                      onClick={() => setActiveCaseStudy(project)}
                    >
                      Case Study
                    </Button>
                  )}
                  {project.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-violet/30 text-violet hover:bg-violet hover:text-white transition-all ${project.caseStudy || project.github ? 'flex-1' : 'w-full'}`}
                      asChild
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Live Demo
                        <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-all px-3"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {activeCaseStudy && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-card max-w-2xl w-full rounded-2xl p-4 md:p-6 relative max-h-[85vh] overflow-y-auto">
      <button
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        onClick={() => setActiveCaseStudy(null)}
      >
        ✕
      </button>

      <h3 className="text-2xl font-heading font-bold mb-2">
        {activeCaseStudy.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4">
        {activeCaseStudy.caseStudy?.type} · {activeCaseStudy.caseStudy?.role}
      </p>

      <p className="mb-4">
        {activeCaseStudy.caseStudy?.overview}
      </p>

      <h4 className="font-semibold mb-2">Key Contributions</h4>
      <ul className="list-disc pl-5 space-y-1 mb-4">
       {activeCaseStudy.caseStudy?.contributions.map((item, i) => (
  <li key={i}>{item}</li>
))}
      </ul>

      <p className="text-sm text-muted-foreground">
        <strong>Impact:</strong> {activeCaseStudy.caseStudy?.impact}
      </p>
    </div>
  </div>
)}
    </section>
  );
}
