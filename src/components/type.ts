interface Project {
  _id: string;
  name: string;
  at: string;
  description: string;
  techStack: string;
  duration: string;
  images: string[];
  slug: string;
  github: string;
  live: string;
  icon: string;
}

interface AboutMe {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  experience: Experience[];
  resume: string;
  email: string;
  github: string;
  linkedIn: string;
  leetcode: string;
  techNodes: TechNode;
  radar: RadarCat;
}

interface Experience {
  at: string;
  duration: string;
  description: string;
}

interface TechNode {
  nodes: TechNodeItem[];
  links: Link[];
}

interface TechNodeItem {
  id: string;
  category: string;
  description: string;
}

interface Link {
  source: string;
  target: string;
}

interface RadarCat {
  fullstack: RadarVal[];
  devops: RadarVal[];
}

interface RadarVal {
  category: string;
  value: string;
}
