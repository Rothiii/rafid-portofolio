import { StaticImageData } from "next/image";

export type Project = {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  logo?: string;
  live?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    num: "01",
    category: "Mobile & Backend API Development",
    title: "Mobile Chat Application",
    description:
      "A real-time chat application for mobile, featuring a Socket-based backend and integrated with LLM (Large Language Model) for chatbot functionality. The system allows real-time chat with random people or bots.",
    stack: [
      { name: "ExpressJs" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "Flutter" },
      { name: "Nginx" },
      { name: "Socket.IO" },
    ],
    image: "/assets/projects/project-chatbot.jpg",
    logo: "/assets/projects/logo-chatbot.png",
    github: "https://github.com/Rothiii/backend-random-chat-app/tree/chat",
  },
  {
    num: "02",
    category: "Backend System Development",
    title: "Attendance Management System",
    description:
      "A geo-location-based attendance system integrated with a mobile application. The system includes an API for managing attendance and employee data, developed to improve team collaboration and system debugging.",
    stack: [
      { name: "ExpressJs" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "Nginx" },
    ],
    logo: "/assets/projects/logo-meraih.png",
    image: "/assets/projects/project-meraih.png",
    github: "https://github.com/Rothiii/backend_MeraihApp",
  },
  {
    num: "03",
    category: "Backend System & Performance",
    title: "Production-Level Backend System @ PT. Indominco Mandiri",
    description:
      "Developed and maintained a backend system with Node.js, REST API, and PostgreSQL that was actively used by over 1,000+ users in a production environment. Designed scalable API endpoints to manage over 50,000 records and optimized performance with efficient pagination.",
    stack: [
      { name: "Node.js" },
      { name: "TypeScript" },
      { name: "Expressjs" },
      { name: "REST API" },
      { name: "PostgreSQL" },
      { name: "Nginx" },
    ],
    logo: "/assets/projects/logo-imm.png",
    image: "/assets/projects/project-imm.jpg",
  },
  // {
  //   num: "04",
  //   category: "Cloud & AI Integration",
  //   title: "LLM-Integrated Health Chatbot @ Bangkit Academy",
  //   description:
  //     "A healthcare chatbot application developed in a team using Flutter, REST, and an LLM-integrated backend. The project involved building and deploying high-availability VM instances on Google Cloud and creating authentication APIs and a chat service that enabled real-time health assistant features.",
  //   stack: [
  //     { name: "Google Cloud" },
  //     { name: "REST API" },
  //     { name: "LLM" },
  //     { name: "Flutter" },
  //     { name: "FastAPI" },
  //   ],
  //   logo: "/assets/projects/logo-bangkit.png",
  //   image: "/assets/projects/project-bangkit.png",
  // },
];
