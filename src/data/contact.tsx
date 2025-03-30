import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

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