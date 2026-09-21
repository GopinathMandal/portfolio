import type { ContactInfo, Education, Experience, Project, SkillCategory } from '../types';

export const personalInfo: ContactInfo = {
  name: "GOPINATH MANDAL",
  title: "Full Stack Developer & B.Tech CSE (2026)",
  location: "Bhubaneswar, Odisha, India",
  phone: "+91 70082 49215",
  email: "gopinathmandal3512@gmail.com",
  github: "https://github.com/GopinathMandal",
  linkedin: "https://linkedin.com/in/gopinath-mandal-a8a59b26",
  portfolio: "https://github.com/GopinathMandal",
  bio: "B.Tech Computer Science student (2026 graduate) with hands-on full stack development experience across Django, React.js, Node.js, TypeScript and MySQL. Built and shipped production-ready features during a summer internship, and independently engineered two full-stack web applications including an enterprise QR attendance system. Passionate about owning features from database schema design all the way to ultra-responsive, high-performance user interfaces."
};

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    iconName: "Code2",
    skills: [
      { name: "TypeScript", level: 90, category: "Languages", description: "Strict typing, generics, React TS integration" },
      { name: "JavaScript (ES6+)", level: 95, category: "Languages", description: "Async/await, DOM APIs, modern JS runtime" },
      { name: "Python", level: 88, category: "Languages", description: "Django backend, REST frameworks, automation" },
      { name: "SQL", level: 86, category: "Languages", description: "Complex joins, indexing, query optimization" },
      { name: "Java", level: 78, category: "Languages", description: "OOP concepts, Data structures, Algorithms" },
    ]
  },
  {
    category: "Frontend Development",
    iconName: "Layout",
    skills: [
      { name: "React.js", level: 92, category: "Frontend", description: "Hooks, state management, reusable architecture" },
      { name: "Tailwind CSS", level: 94, category: "Frontend", description: "Modern responsive utilities, glassmorphism, animations" },
      { name: "HTML5 & CSS3", level: 95, category: "Frontend", description: "Semantic markup, CSS Grid, Flexbox, responsive design" },
      { name: "Bootstrap", level: 85, category: "Frontend", description: "Component systems, grid layout, rapid UI creation" },
      { name: "Responsive Design", level: 95, category: "Frontend", description: "Pixel-perfect rendering down to 320px width" },
    ]
  },
  {
    category: "Data Viz & 3D Graphics",
    iconName: "Boxes",
    skills: [
      { name: "Three.js", level: 85, category: "Graphics", description: "3D scenes, particle meshes, WebGL canvas, lighting" },
      { name: "Chart.js", level: 90, category: "Data Viz", description: "Interactive analytics dashboards, dynamic charting" },
    ]
  },
  {
    category: "Backend & APIs",
    iconName: "Server",
    skills: [
      { name: "Django", level: 88, category: "Backend", description: "Robust MVC architecture, ORM, Auth, middleware" },
      { name: "Django REST Framework", level: 86, category: "Backend", description: "Serializers, ViewSets, token authentication" },
      { name: "Node.js", level: 88, category: "Backend", description: "Event loop, asynchronous server runtime" },
      { name: "Express.js", level: 90, category: "Backend", description: "RESTful routing, middleware pipelines, session handling" },
      { name: "REST APIs", level: 92, category: "Backend", description: "Endpoint design, status codes, payload optimization" },
    ]
  },
  {
    category: "Databases",
    iconName: "Database",
    skills: [
      { name: "MySQL", level: 88, category: "Databases", description: "Relational schema design, normalization, indexing" },
      { name: "SQLite", level: 90, category: "Databases", description: "Embedded databases, Django default ORM integration" },
      { name: "MongoDB", level: 80, category: "Databases", description: "Document data modeling, NoSQL queries" },
    ]
  },
  {
    category: "Tools & Core Coursework",
    iconName: "Cpu",
    skills: [
      { name: "Git & GitHub", level: 90, category: "Tools", description: "Version control, branching, PR workflows, CI/CD" },
      { name: "VS Code", level: 95, category: "Tools", description: "Extensions, debugging, modern development workflow" },
      { name: "Postman", level: 90, category: "Tools", description: "API endpoint testing, collection runners, auth mocking" },
      { name: "Data Structures & Algorithms", level: 85, category: "Coursework", description: "Arrays, Trees, Graphs, Sorting, Time Complexity" },
      { name: "DBMS & Operating Systems", level: 86, category: "Coursework", description: "ACID transactions, Process scheduling, Memory management" },
      { name: "Computer Networks & OOP", level: 88, category: "Coursework", description: "OSI model, TCP/IP, HTTP/S, Polymorphism, Inheritance" },
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: "internship-2024",
    role: "Full Stack Web Development Intern",
    company: "Remote Internship",
    location: "Remote",
    period: "June – August 2024",
    description: [
      "Built responsive front-end pages using HTML5, CSS3, Bootstrap, and JavaScript, ensuring pixel-perfect rendering across desktop, tablet, and mobile devices down to 320px width.",
      "Integrated front-end with a Django and MySQL backend to support real-time data operations for job listings and user management.",
      "Developed and tested all REST API endpoints, and reduced a slow report query from ~4.8s to ~1.5s (68% improvement) by adding strategic indexes and eliminating redundant queries.",
      "Improved page performance through asset compression and image lazy-loading, while actively debugging and resolving issues identified during development and code review."
    ],
    metrics: [
      { label: "Query Speedup", value: "68%", detail: "Reduced 4.8s report query to ~1.5s" },
      { label: "Responsive Target", value: "320px", detail: "Mobile-first seamless rendering" },
      { label: "Architecture", value: "Django + MySQL", detail: "End-to-end RESTful integration" }
    ],
    technologies: ["Django", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap", "REST APIs", "Performance Tuning"]
  }
];

export const projectsData: Project[] = [
  {
    id: "qr-erp",
    title: "QR ERP — Attendance Management System",
    subtitle: "Enterprise QR Attendance & Live Visual Analytics Platform",
    category: "Full Stack / Data Viz",
    badge: "Featured Production System",
    description: "Built a QR code-based attendance system that auto-generates a unique, dynamic QR code per class session, empowering students to check in instantly instead of wasting valuable class time through traditional manual roll call.",
    highlights: [
      "Auto-generates time-bounded, unique QR per class session for frictionless instant student check-in.",
      "Engineered MySQL relational schema and Express.js REST APIs with robust duplicate-scan and replay prevention.",
      "Developed comprehensive React.js admin dashboard featuring dynamic Chart.js visualizations for attendance records, automated report generation, and student roster management."
    ],
    techStack: ["React.js", "TypeScript", "Node.js", "Express.js", "MySQL", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com/GopinathMandal",
    demoUrl: "https://github.com/GopinathMandal",
    interactiveType: "qr-simulator"
  },
  {
    id: "job-portal",
    title: "Job Portal Web Application",
    subtitle: "Dual-Role Recruitment Portal & Employer Dashboard",
    category: "Full Stack / Web App",
    badge: "Full Stack System",
    description: "Developed a full-featured job portal supporting dual user roles (Job Seekers & Employers) with real-time job listings, multi-parameter search & filtering, and a powerful employer dashboard for posting and tracking candidate applications.",
    highlights: [
      "Implemented secure authentication and Role-Based Access Control (RBAC) separating applicant and employer permissions.",
      "Built resume upload subsystem with client and server-side file-type validation and strict size restrictions.",
      "Modelled relational database entities using Django ORM and crafted a responsive Bootstrap and Tailwind CSS UI optimized for mobile and desktop."
    ],
    techStack: ["Django", "Python", "SQLite", "Bootstrap", "Tailwind CSS", "REST APIs", "HTML5/CSS3"],
    githubUrl: "https://github.com/GopinathMandal",
    demoUrl: "https://github.com/GopinathMandal",
    interactiveType: "job-portal"
  }
];

export const educationData: Education[] = [
  {
    degree: "B.Tech in Computer Science and Technology",
    institution: "Trident Academy of Technology",
    location: "Bhubaneswar, Odisha",
    period: "2022 – 2026",
    score: "CGPA: 7.17 / 10.00",
    details: "Core focus on Full Stack Web Development, Database Management, Algorithms, Distributed Computing, and System Architecture.",
    badge: "Current Degree"
  },
  {
    degree: "Class XII (Senior Secondary - CBSE)",
    institution: "Kendriya Vidyalaya",
    location: "Paradip Port, Odisha",
    period: "2020 – 2022",
    score: "63.7%",
    details: "Science Stream with Physics, Chemistry, Mathematics, and Computer Science foundation.",
    badge: "CBSE"
  },
  {
    degree: "Class X (Secondary - CBSE)",
    institution: "Kendriya Vidyalaya",
    location: "Paradip Port, Odisha",
    period: "2019 – 2020",
    score: "61.66%",
    details: "Strong foundational sciences, mathematics, and logical aptitude.",
    badge: "CBSE"
  }
];
