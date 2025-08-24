// experience data
type ExperienceItem = {
  company: string;
  position: string;
  period: string;
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
      company: "PT. Indominco Mandiri",
      position: "Backend Developer and DevOps",
      period: "Jun 2024 - Present",
      technologies: [
        "NodeJs",
        "ExpressJs",
        "Docker",
        "Jenkins",
        "PostgreSQL",
        "Nginx",
        "PM2",
      ],
      points: [
        "Developed and maintained backend services using modern technologies",
        "Implemented DevOps practices for continuous integration and deployment",
        "Collaborated with cross-functional teams to deliver scalable solutions",
        "Optimized application performance and monitoring systems",
      ],
    },
    {
      company: "Project at Uni",
      position: "Flutter Developer",
      period: "Aug 2024 - Nov 2024",
      technologies: ["Flutter", "Dart", "ExpressJS", "NodeJs", "Git", "Figma"],
      points: [
        "Built cross-platform mobile applications using Flutter framework",
        "Implemented responsive UI designs and smooth user interactions",
        "Integrated APIs and managed state management efficiently",
        "Collaborated with team members using Git version control",
      ],
    },
    {
      company: "Project Uni",
      position: "Backend Developer",
      period: "Feb 2024 - May 2024",
      technologies: [
        "Express.js",
        "Node.js",
        "PostgreSQL",
        "JavaScript",
        "Postman",
      ],
      points: [
        "Designed and developed RESTful APIs for web applications",
        "Implemented database schemas and optimized query performance",
        "Worked with team members to integrate frontend and backend systems",
        "Applied software engineering best practices and code reviews",
      ],
    },
    {
      company: "Bangkit Academy",
      position: "Cloud Computing Cohort",
      period: "2015 - 2016",
      technologies: [
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "Terraform",
        "NodeJs",
        "Virtual Machine",
      ],
      points: [
        "Learned cloud computing fundamentals and Google Cloud Platform services",
        "Participated in hands-on projects involving cloud infrastructure",
        "Collaborated with machine learning and mobile development cohorts",
        "Completed capstone project demonstrating cloud computing skills",
      ],
    },
  ],
};
