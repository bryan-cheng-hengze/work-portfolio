import tba from '../assets/tba.png';
import auroraLegacy from '../assets/aurora-legacy.png';

export interface Project {
  name: string;
  category: string;
  url: string;
  image: string;
  isInversed?: boolean;
}

export const projects: Project[] = [
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