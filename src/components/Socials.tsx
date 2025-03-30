import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

type Social = {
  url: string;
  name: string;
  icon: JSX.Element;
};

const socials: Social[] = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    url: "https://facebook.com/rrafidd/",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://linkedin.com/in/rafid-al-khairy/",
  },
  {
    name: "Github",
    icon: <FaGithub />,
    url: "https://github.com/Rothiii",
  }
];

type Props = {
  containerStyles: string;
  iconStyles: string;
};

const Socials = ({ containerStyles, iconStyles }: Props) => {
  return (
    <div className={containerStyles}>
      {socials.map((social, index) => (
        <Link key={index} href={social.url} className={iconStyles} target="_blank" rel="noopener noreferrer">
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
