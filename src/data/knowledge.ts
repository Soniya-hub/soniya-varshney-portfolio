// Single source of truth about Soniya used by the AI chatbot (serverless
// system prompt) and the client-side scripted fallback.

export const PROFILE = {
  name: 'Soniya Varshney',
  role: 'Senior Software Engineer · AI Agents & Freelance Automation',
  summary:
    '5+ years of experience building Java microservices, Spring Boot backends, and React/Next.js frontends, including at Optum (UnitedHealth Group). MBA in Finance. Builds AI agents and end-to-end automation systems — AI proposals, client onboarding, and invoice pipelines — for startups and founders.',
  location: 'India',
  links: {
    github: 'https://github.com/Soniya-hub',
    linkedin: 'https://www.linkedin.com/in/soniya-varshney-49071a1b8',
    resume: '/Soniya_Varshney_Resume.pdf',
  },
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Optum · UnitedHealth Group',
      highlights:
        'Release Management Tool — approval workflows in Spring Boot, Node.js microservices, React portal; 25% throughput increase, resolved 100+ production issues.',
    },
    {
      title: 'Software Engineer (ASE-2) → Senior',
      company: 'Optum · UnitedHealth Group',
      highlights:
        'Java microservices, REST APIs, JWT auth, CI/CD with Jenkins and GitHub Actions.',
    },
    {
      title: 'Software Engineer Intern',
      company: 'Apisero',
      highlights: 'MuleSoft/integration work.',
    },
  ],
  projects: [
    {
      name: 'Ripple NDT — Tax Invoicing & Job Management',
      blurb:
        'Production web app for a marine/vessel NDT inspection company — job lifecycle, GST-compliant invoicing (CGST/SGST/IGST) with exact Decimal math, RBAC (Admin/Accountant/Job Staff/Director), 230+ tests. Next.js 16 + Prisma 7 + Supabase, delivered as subcontractor.',
    },
    {
      name: 'FlwCRM',
      blurb:
        'Live SaaS CRM (flwcrm.vercel.app) — lead pipeline, tasks, analytics dashboards, RBAC admin panel. React + Spring Boot + PostgreSQL, deployed on Vercel/Render.',
    },
    {
      name: 'FreelanceOS',
      blurb:
        'Freelance automation platform — AI proposal generation, client onboarding email flows, PDF invoice automation with scheduled follow-ups. Spring Boot + React + OpenAI API on GCP.',
    },
    {
      name: 'Release Management Tool (Optum)',
      blurb:
        'Enterprise release-approval system replacing SharePoint workflows; audit compliance, JWT auth, React portal.',
    },
    {
      name: 'InvestorVault',
      blurb: 'RBAC investor management portal with interest calculators and dashboards.',
    },
  ],
  skills: {
    ai: [
      'AI Agents',
      'Agentic AI workflows',
      'Prompt Engineering',
      'Claude API',
      'OpenAI API',
      'Workflow Automation',
    ],
    backend: ['Java', 'Spring Boot', 'Node.js', 'REST APIs', 'Microservices'],
    frontend: ['React.js', 'Next.js', 'TypeScript', 'Angular', 'TailwindCSS'],
    data: ['PostgreSQL', 'MySQL', 'Supabase', 'Oracle'],
    cloud: ['GCP', 'AWS', 'Docker', 'Jenkins', 'GitHub Actions', 'Vercel'],
    business: ['MBA Finance', 'Financial Modelling', 'Client Management', 'Agile/Scrum'],
  },
  certifications: [
    'Java (Core & Advanced)',
    'UiPath RPA Developer Foundation',
    'Agile Fundamentals: Scrum & Kanban',
    'Creative Certificate & Campaign Manager',
    'Business English Certificate',
  ],
  availability:
    'Available for freelance projects — AI agents, automation systems, full-stack SaaS builds, and Next.js/React frontends. Best reached via the contact form on this site, LinkedIn, or Upwork.',
};

export function buildSystemPrompt(): string {
  return `You are Sona, the friendly AI assistant on ${PROFILE.name}'s portfolio website. Visitors are usually recruiters, hiring managers, or founders looking to hire her.

About ${PROFILE.name}:
- ${PROFILE.role}
- ${PROFILE.summary}

Experience:
${PROFILE.experience.map((e) => `- ${e.title} at ${e.company}: ${e.highlights}`).join('\n')}

Projects:
${PROFILE.projects.map((p) => `- ${p.name}: ${p.blurb}`).join('\n')}

Skills:
- AI & Automation: ${PROFILE.skills.ai.join(', ')}
- Backend: ${PROFILE.skills.backend.join(', ')}
- Frontend: ${PROFILE.skills.frontend.join(', ')}
- Databases: ${PROFILE.skills.data.join(', ')}
- Cloud/DevOps: ${PROFILE.skills.cloud.join(', ')}
- Business: ${PROFILE.skills.business.join(', ')}

Certifications: ${PROFILE.certifications.join(', ')}

Availability: ${PROFILE.availability}
Links: GitHub ${PROFILE.links.github} · LinkedIn ${PROFILE.links.linkedin}

Rules:
- Answer questions about Soniya's skills, experience, projects, and availability. Be warm, concise (2-4 sentences unless asked for detail), and specific.
- Encourage serious inquiries to use the contact form or LinkedIn.
- If asked something unrelated to Soniya or hiring her, politely steer back.
- Never invent facts not listed above. If you don't know, say so and point to the contact form.`;
}
