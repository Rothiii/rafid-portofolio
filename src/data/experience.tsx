// experience data
type ExperienceItem = {
  company: string;
  position: string;
  period: string;
  location?: string;
  technologies: string[];
  points: string[];
};
type Experience = {
  title: string;
  description: string;
  items: ExperienceItem[];
};
export const experience: Experience = {
  title: "My Professional Experience",
  description: "A brief overview of my work experience and skills.",
  items: [
    {
      company: "PT. Planet IT",
      position: "Full Stack Developer",
      period: "Sep 2025 - Sep 2026",
      location: "Balikpapan, Kalimantan Timur",
      technologies: ["Nuxt.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "VPS"],
      points: [
        "Managed VPS infrastructure and maintained deployment pipelines to ensure smooth and efficient application release processes.",
        "Resolved production bugs and performed routine troubleshooting to minimize client-reported operational issues.",
        "Conducted periodic production data fixes and system audits to ensure data integrity and accurate reporting.",
      ],
    },
    {
      company: "Upwork",
      position: "Freelance Full Stack Developer",
      period: "Oct 2025 - Mar 2026",
      location: "Remote",
      technologies: [
        "TypeScript",
        "Firebase Functions",
        "Firestore",
        "Flutter",
        "Google Cloud",
        "REST API",
      ],
      points: [
        "Maintained Firebase Functions and Firestore services using TypeScript to support automated appointment scheduling and WhatsApp customer re-engagement workflows.",
        "Maintained Flutter applications, integrated REST APIs with Google Cloud, and resolved cross-platform issues.",
        "Performed feature testing, reviewed pull requests to maintain code quality, and collaborated with the team to deliver reliable, production-ready releases.",
      ],
    },
    {
      company: "PT. Indominco Mandiri",
      position: "Backend Developer Intern",
      period: "Jun 2024 - Aug 2024",
      location: "Bontang, Kalimantan Timur",
      technologies: ["Node.js", "Express.js", "REST API", "PostgreSQL", "Nginx"],
      points: [
        "Maintained and developed backend systems (Node.js, REST API, PostgreSQL) to ensure operational service stability.",
        "Coordinated directly with stakeholders to translate business requirements into technical features, ensuring backend development aligned with end-user expectations.",
        "Collaborated with the frontend team on API integration to ensure consistent data flow and minimize technical issues.",
      ],
    },
    {
      company: "Bangkit Academy",
      position: "Cloud Computing Cohort",
      period: "Aug 2023 - Jan 2024",
      location: "Remote",
      technologies: [
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Node.js",
        "Virtual Machine",
      ],
      points: [
        "Designed and deployed virtual machines on Google Cloud for scalable backend systems.",
        "Implemented APIs with LLM-integrated chat services.",
        "Collaborated with mobile and machine learning teams to develop a chatbot application using Flutter, REST, and an LLM-based backend.",
      ],
    },
  ],
};
