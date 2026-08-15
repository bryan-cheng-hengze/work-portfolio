import tba from '../assets/tba.png';
import auroraLegacy from '../assets/aurora-legacy.png';
import kyraTechnologies from '../assets/kyra-technologies.png';

export interface Project {
  name: string;
  category: string;
  url: string;
  image: string;
  isInversed?: boolean;
}

export const projects: Project[] = [
  {
    name: "Kyra Technologies",
    category: "Software Development",
    url: "https://www.kyra-technologies.com/",
    image: kyraTechnologies,
  },
  {
    name: "Aurora Legacy",
    category: "Financial Advisory",
    url: "https://aurora-legacy.com/",
    image: auroraLegacy,
  },
  {
    name: "",
    category: "To Be Announced",
    url: "",
    image: tba,
    isInversed: true
  }
]; 