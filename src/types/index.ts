export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  badge: string;
  interactiveType: 'qr-simulator' | 'job-portal' | 'generic';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  metrics: { label: string; value: string; detail: string }[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    category: string;
    description?: string;
    icon?: string;
  }[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  details?: string;
  badge?: string;
}

export interface ContactInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
  bio: string;
}
