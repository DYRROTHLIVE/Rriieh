/**
 * razyprofessional portfolio — Central Content Configuration
 * Edit the values below to personalize your portfolio without touching HTML.
 */
window.PORTFOLIO_DATA = {
  brand: {
    title: "razyprofessional portfolio",
    shortName: "Razy",
    monogram: "RZ",
    role: "Full-Stack Developer & Product Engineer",
    availability: "Available for select roles & freelance projects",
    location: "Remote / Worldwide",
    email: "hello@razy.dev",
    resumeUrl: "#contact",
  },
  hero: {
    eyebrow: "razyprofessional portfolio",
    headline: "Designing & engineering fast, reliable digital products.",
    subheadline:
      "I'm Razy — a builder focused on clean architecture, thoughtful interfaces, and end-to-end web experiences that turn complex problems into intuitive software.",
    primaryCta: { label: "Explore Selected Work", href: "#work" },
    secondaryCta: { label: "Contact Me", href: "#contact" },
    metrics: [
      { value: "4+", label: "Years Building" },
      { value: "25+", label: "Projects Shipped" },
      { value: "99%", label: "Lighthouse Focus" },
    ],
  },
  about: {
    heading: "Crafting software with clarity, speed, and purpose.",
    paragraphs: [
      "Welcome to the razyprofessional portfolio. I specialize in taking products from early concept and system design all the way to polished, production-grade deployment.",
      "My work bridges frontend craft and backend reliability—pairing accessible, responsive interfaces with resilient APIs, automated testing, and maintainable codebases.",
    ],
    highlights: [
      "End-to-end product engineering from prototype to production",
      "Performance-first UI with strong accessibility and semantics",
      "Clean, documented APIs and scalable data modeling",
    ],
  },
  skills: [
    {
      category: "Frontend & UI",
      items: ["HTML5 & CSS3", "JavaScript (ES6+)", "TypeScript", "React / Next.js", "Tailwind CSS", "Responsive Design"],
    },
    {
      category: "Backend & Data",
      items: ["Node.js", "Python", "REST & GraphQL APIs", "PostgreSQL", "Redis", "Authentication & Security"],
    },
    {
      category: "Tooling & Cloud",
      items: ["Git & GitHub Actions", "Docker", "Linux", "CI/CD Pipelines", "Performance Profiling", "Automated Testing"],
    },
  ],
  projects: [
    {
      id: "pulse-analytics",
      title: "PulseFlow Analytics",
      category: "Web Apps",
      year: "2026",
      summary:
        "Real-time product telemetry dashboard processing high-frequency events with sub-second filtering and role-based workspaces.",
      description:
        "Built a full-stack analytics platform featuring customizable KPI boards, streaming query previews, and exportable executive reports. Designed a lightweight client state layer to keep dense data tables responsive at 60fps.",
      stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
      impact: "Reduced report generation latency by 62% for workspace teams.",
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
    {
      id: "atelier-ui",
      title: "Atelier Design System",
      category: "Design Systems",
      year: "2025",
      summary:
        "Accessible, token-driven component library and documentation portal supporting dark/light themes and WCAG AA contrast.",
      description:
        "Architected 35+ reusable primitives including dialogs, comboboxes, data grids, and toast notifications. Standardized spacing, typography, and motion tokens across multiple web applications.",
      stack: ["CSS Tokens", "TypeScript", "WCAG 2.1", "Storybook"],
      impact: "Cut new feature UI development time nearly in half across 4 products.",
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
    {
      id: "vault-cli",
      title: "EnvGuard CLI",
      category: "Open Source",
      year: "2025",
      summary:
        "Zero-dependency environment variable validator and schema checker for CI pipelines and local developer onboarding.",
      description:
        "Created an open-source CLI tool that catches missing secrets, malformed URLs, and type mismatches before deployment. Includes colored diagnostics and JSON output for CI integrations.",
      stack: ["Node.js", "CLI", "JSON Schema", "GitHub Actions"],
      impact: "Adopted across internal microservices to eliminate config-related deploy failures.",
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
    {
      id: "nomad-commerce",
      title: "Kinetix Storefront",
      category: "Web Apps",
      year: "2024",
      summary:
        "High-conversion headless storefront with instant search, optimistic cart state, and streamlined multi-currency checkout.",
      description:
        "Engineered a fast, mobile-first commerce experience with edge-cached catalog pages, skeleton loading states, and webhook-driven order tracking.",
      stack: ["Next.js", "Stripe API", "PostgreSQL", "Edge Cache"],
      impact: "Achieved 98+ mobile performance score and 24% faster checkout completion.",
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
  ],
  experience: [
    {
      role: "Senior Product Engineer",
      company: "Independent / Studio Razy",
      period: "2024 — Present",
      summary:
        "Partnering with startups and growing teams to architect web applications, design systems, and scalable backend services.",
      bullets: [
        "Delivered full-stack client platforms from technical discovery through launch.",
        "Established automated CI checks, accessibility audits, and performance budgets.",
      ],
    },
    {
      role: "Full-Stack Software Developer",
      company: "Northstar Digital Labs",
      period: "2022 — 2024",
      summary:
        "Led frontend architecture and API integrations for B2B SaaS workflows serving thousands of daily active users.",
      bullets: [
        "Refactored legacy dashboards into modular components, improving page load speed by 45%.",
        "Collaborated closely with product designers to ship an internal token-based UI kit.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Brightline Interactive",
      period: "2021 — 2022",
      summary:
        "Built responsive marketing sites, interactive product demos, and custom CMS-driven web experiences.",
      bullets: [
        "Implemented semantic HTML, modern CSS layouts, and cross-browser QA standards.",
        "Mentored junior contributors on Git workflows and clean component patterns.",
      ],
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com", handle: "@razy" },
    { label: "LinkedIn", href: "https://linkedin.com", handle: "in/razy" },
    { label: "X / Twitter", href: "https://x.com", handle: "@razy_dev" },
  ],
};
