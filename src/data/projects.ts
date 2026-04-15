import tba from '../assets/tba.png';

export interface Project {
  name: string;
  category: string;
  url: string;
  image: string;
  isInversed?: boolean;
}

export const projects: Project[] = [
  {
    name: "",
    category: "To Be Announced",
    url: "",
    image: tba,
    isInversed: true
  }
]; 