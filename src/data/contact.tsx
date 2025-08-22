import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

type Info = {
    icon: JSX.Element;
    title: string;
    description: string;
}

export const info: Info[] = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+62) 878 4122 2233 ",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "drome.emord@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Balikpapan, East Kalimantan, Indonesia",
  },
];

export const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, link: "https://github.com/rothiii", handle: "@Rothiii" },
    { name: "LinkedIn", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/rafid-al-khairy/", handle: "Rafid Al Khairy" },
    { name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/rafidal._/", handle: "@rafidal._" },
    { name: "Email", icon: <FaEnvelope />, link: "mailto:drome.emord@gmail.com", handle: "drome.emord@gmail.com" },
  ];