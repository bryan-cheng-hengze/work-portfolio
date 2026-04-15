export interface NavComponent {
  title: string;
  href: string;
  description: string;
}

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}


export const listNavItems: NavItem[] = [
  {
    title: "Journey",
    href: "/journey",
    description: "Development journey, achievements and milestones",
  },
  {
    title: "Roadmap",
    href: "/roadmap",
    description: "Future goals, learning plans and career roadmap",
  },
  {
    title: "Programming Languages and Tools",
    href: "/skills",
    description: "Languages and tools that I've worked with",
  },
  {
    title: "Framework, Infrastructure and Operations",
    href: "/tools",
    description: "Framework, infrastructure and operation tools that I've worked with",
  },
];
