import { StaticImageData } from 'next/image';

export type Project = {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  live: string;
  github: string;
};

export const projects: Project[] = [
  {
    num: "01",
    category: "Full Stack",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js, featuring user authentication, payment integration, and admin dashboard. Includes shopping cart, order management, and inventory tracking.",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "TailwindCSS" },
      { name: "Stripe" }
    ],
    image: "/assets/projects/project1.png",
    live: "https://your-project-live-url.com",
    github: "https://github.com/yourusername/project1"
  },
  {
    num: "02",
    category: "Backend API",
    title: "REST API Server",
    description: "A robust REST API server built with Express.js and PostgreSQL. Features include user authentication, role-based access control, and comprehensive API documentation.",
    stack: [
      { name: "Express.js" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "JWT" },
      { name: "Docker" }
    ],
    image: "/assets/projects/project2.png",
    live: "https://api-demo.com",
    github: "https://github.com/yourusername/project2"
  },
  {
    num: "03",
    category: "Frontend",
    title: "React Dashboard",
    description: "A responsive admin dashboard with data visualization, real-time updates, and user management. Built with React and integrated with various APIs.",
    stack: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Chart.js" },
      { name: "TailwindCSS" },
      { name: "Firebase" }
    ],
    image: "/assets/projects/project3.png",
    live: "https://dashboard-demo.com",
    github: "https://github.com/yourusername/project3"
  }
];