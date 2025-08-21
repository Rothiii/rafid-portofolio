import { JSX } from "react";
import { FaJava } from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiExpress,
  SiJenkins,
  SiNginx,
  SiReact,
  SiPython,
  SiJavascript,
  SiPm2,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGooglecloud,
  SiDocker,
  SiFigma,
  SiPostman,
} from "react-icons/si";

// about data
type AboutInfo = {
  name: string;
  value: string;
};
type About = {
  title: string;
  description: string;
  info: AboutInfo[];
};

export const about: About = {
  title: "About me",
  description:
    "I am a passionate web developer with a strong focus on backend technologies. I have a deep understanding of server-side programming, database management, and API development. My goal is to create efficient and scalable web applications that provide seamless user experiences. I am always eager to learn new technologies and improve my skills in the ever-evolving field of web development.",
  info: [
    {
      name: "Name",
      value: "Rafid Al Khairy",
    },
    {
      name: "Phone",
      value: "(+62) 878 4122 2233",
    },
    {
      name: "Experience",
      value: "2+ years",
    },
    {
      name: "Nationality",
      value: "Indonesian",
    },
    {
      name: "Email",
      value: "drome.emord@gmail.com",
    },
    {
      name: "Freelance",
      value: "Available",
    },
    {
      name: "Language",
      value: "Indonesian, English",
    },
  ],
};

// experience data
type ExperienceItem = {
  company: string;
  position: string;
  duration: string;
};
type Experience = {
  icon: string;
  title: string;
  description: string;
  items: ExperienceItem[];
};
export const experience: Experience = {
  title: "My Experience",
  icon: "/assets/resume/badge.svg",
  description:
    "Throughout my career, I have gained valuable experience in various roles, including, front end development, UI/UX design, and back end development. I have worked with diverse teams and clients, honing my skills in web development and design. My experience has equipped me with a strong foundation in both technical and soft skills, allowing me to adapt to different challenges and deliver high-quality results.",
  items: [
    {
      company: "PT. Indominco Mandiri",
      position: "Backend Developer and DevOps",
      duration: "Jun 2024 - Present",
    },
    {
      company: "Project at Uni",
      position: "Flutter Developer",
      duration: "Aug 2024 - Nov 2024",
    },
    {
      company: "Project Uni",
      position: "Backend Developer",
      duration: "Feb 2024 - May 2024",
    },
    {
      company: "Bangkit Academy",
      position: "Cloud Computing Cohort",
      duration: "2015 - 2016",
    },
  ],
};

// educational data
type EducationItem = {
  institution: string;
  duration: string;
  degree: string;
  score?: string;
};
type Education = {
  icon: string;
  title: string;
  description: string;
  items: EducationItem[];
};
export const education: Education = {
  title: "My Education",
  icon: "/assets/resume/cap.svg",
  description:
    "I have a strong educational background in computer science and web development. I have completed various courses and certifications that have equipped me with the necessary skills to excel in the field. My education has provided me with a solid foundation in programming languages, web technologies, and design principles.",
  items: [
    {
      institution: "Bangkit Academy",
      degree: "Cloud Computing",
      duration: "Aug 2023 - Jan 2024",
    },
    {
      institution: "Kalimantan Institute of Technology",
      degree: "Computer Science",
      duration: "2021 - 2025",
      score: "3.59/4.00"
    },
    {
      institution: "Senior High School 5 Balikpapan",
      degree: "Mathematics and Science",
      duration: "2019 - 2021",
      score: "87.93/100.00",
    },
  ],
};

// skills data
type SkillItem = {
  name: string;
  icon: JSX.Element;
};
type Skill = {
  title: string;
  description: string;
  items: SkillItem[];
};
export const skills: Skill = {
  title: "My Skills",
  description:
    " I have a diverse skill set that includes front-end and back-end development, UI/UX design, and cloud computing. I am proficient in various programming languages and frameworks, allowing me to create dynamic and responsive web applications. My skills also extend to database management, API development, and DevOps practices. I am constantly learning and adapting to new technologies to stay ahead in the ever-evolving tech landscape.",
  items: [
    {
      name: "TypeScript",
      icon: <SiTypescript />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript />,
    },
    {
      name: "Java",
      icon: <FaJava />,
    },
    {
      name: "Python",
      icon: <SiPython />,
    },
    {
      name: "ExpressJS",
      icon: <SiExpress />,
    },
    {
      name: "React",
      icon: <SiReact />,
    },
    {
      name: "TailwindCSS",
      icon: <SiTailwindcss />,
    },
    {
      name: "NextJS",
      icon: <SiNextdotjs />,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
    },
    {
      name: "MySQL",
      icon: <SiMysql />,
    },
    {
      name: "Firebase",
      icon: <SiFirebase />,
    },
    {
      name: "Git",
      icon: <SiGit />,
    },
    {
      name: "Google Cloud Platform",
      icon: <SiGooglecloud />,
    },
    {
      name: "Jenkins",
      icon: <SiJenkins />,
    },
    {
      name: "Nginx",
      icon: <SiNginx />,
    },
    {
      name: "PM2 Process Manager",
      icon: <SiPm2 />,
    },
    {
      name: "Docker",
      icon: <SiDocker />,
    },
    {
      name: "Figma",
      icon: <SiFigma />,
    },
    {
      name: "Postman",
      icon: <SiPostman />,
    },
  ],
};
