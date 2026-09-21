import React from 'react';
import { X, Printer, Copy, Check, Mail, Phone, MapPin } from 'lucide-react';
import { personalInfo, experienceData, projectsData, educationData } from '../data/portfolioData';
import { soundFx } from '../utils/soundController';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleCopy = () => {
    soundFx.playSuccess();
    const textContent = `
GOPINATH MANDAL
Bhubaneswar, Odisha | ${personalInfo.phone} | ${personalInfo.email}
github.com/GopinathMandal | linkedin.com/in/gopinath-mandal-a8a59b26

SUMMARY
${personalInfo.bio}

TECHNICAL SKILLS
Languages: Python, JavaScript, TypeScript, Java, SQL
Frontend: React.js, Tailwind CSS, HTML5, CSS3, Bootstrap, responsive design
Data Viz & Graphics: Chart.js, Three.js
Backend: Django, Django REST Framework, Node.js, Express.js, REST APIs
Databases: MySQL, SQLite, MongoDB
Tools: Git, GitHub, VS Code, Postman
Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP

WORK EXPERIENCE
Full Stack Web Development Intern (Remote) June – August 2024
● Built responsive front-end pages using HTML5, CSS3, Bootstrap, and JavaScript down to 320px width.
● Integrated front-end with a Django and MySQL backend to support real-time data operations.
● Developed and tested all REST API endpoints; reduced slow report query from ~4.8s to ~1.5s (-68%).
● Improved page performance through asset compression and image lazy-loading.

PROJECTS
1. QR ERP — Attendance Management System (React.js, TypeScript, Node.js, Express.js, MySQL, Chart.js)
● Built unique QR code per session auto-generation for instant student check-in.
● Designed MySQL schema and Express REST API with duplicate-scan prevention.
● Developed admin dashboard in React.js with Chart.js analytics and automated report generation.

2. Job Portal Web Application (Django, SQLite, Bootstrap, Tailwind CSS)
● Developed dual-role job portal with search, filtering, and employer dashboard.
● Implemented authentication, RBAC, and validated resume upload with size restrictions.
● Modelled tables in Django ORM and built responsive UI for desktop and mobile.

EDUCATION
B.Tech in Computer Science and Technology (2022 – 2026) | CGPA: 7.17 / 10.00 | Trident Academy of Technology, Bhubaneswar
Class XII (CBSE, 2022) | 63.7% | Kendriya Vidyalaya, Paradip Port
Class X (CBSE, 2020) | 61.66% | Kendriya Vidyalaya, Paradip Port
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-teal-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-teal-400/60 bg-slate-950 shrink-0">
              <img
                src="/profile.jpg"
                alt="Gopinath Mandal"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Gopinath Mandal — Curriculum Vitae
              </h3>
              <p className="text-[11px] text-teal-400 font-mono">
                B.Tech CSE &bull; Full Stack Developer (2026)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Copy plain text CV"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
              title="Print or Save PDF"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950 text-slate-200 font-sans space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-700">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-teal-500/40 bg-slate-900 shrink-0">
              <img
                src="/profile.jpg"
                alt="Gopinath Mandal"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                GOPINATH MANDAL
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-300 font-mono mt-2">
                <span className="flex items-center gap-1"><MapPin size={12} className="text-rose-400" /> Bhubaneswar, Odisha</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Phone size={12} className="text-teal-400" /> {personalInfo.phone}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Mail size={12} className="text-cyan-400" /> {personalInfo.email}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-teal-400 font-mono mt-2">
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                  github.com/GopinathMandal
                </a>
                <span>&bull;</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  linkedin.com/in/gopinath-mandal-a8a59b26
                </a>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-teal-400 uppercase border-b border-slate-800 pb-1 mb-2">
              SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-teal-400 uppercase border-b border-slate-800 pb-1 mb-2">
              TECHNICAL SKILLS
            </h2>
            <div className="text-xs space-y-1 text-slate-300">
              <p><span className="font-semibold text-white">Languages:</span> Python, JavaScript, TypeScript, Java, SQL</p>
              <p><span className="font-semibold text-white">Frontend:</span> React.js, Tailwind CSS, HTML5, CSS3, Bootstrap, responsive design</p>
              <p><span className="font-semibold text-white">Data Viz &amp; Graphics:</span> Chart.js, Three.js</p>
              <p><span className="font-semibold text-white">Backend:</span> Django, Django REST Framework, Node.js, Express.js, REST APIs</p>
              <p><span className="font-semibold text-white">Databases:</span> MySQL, SQLite, MongoDB</p>
              <p><span className="font-semibold text-white">Tools:</span> Git, GitHub, VS Code, Postman</p>
              <p><span className="font-semibold text-white">Coursework:</span> Data Structures &amp; Algorithms, DBMS, Operating Systems, Computer Networks, OOP</p>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-teal-400 uppercase border-b border-slate-800 pb-1 mb-2">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between text-xs">
                <span className="font-bold text-white text-sm">Full Stack Web Development Intern (Remote)</span>
                <span className="font-mono text-cyan-400">June – August 2024</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-slate-300">
                {experienceData[0].description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-teal-400 uppercase border-b border-slate-800 pb-1 mb-2">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projectsData.map((p) => (
                <div key={p.id} className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between text-xs">
                    <span className="font-bold text-white text-sm">
                      {p.title} <span className="font-normal text-slate-400 font-mono">— {p.techStack.join(', ')}</span>
                    </span>
                    <div className="flex items-center gap-2 font-mono text-teal-400">
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                      <span>|</span>
                      <a href={p.demoUrl} target="_blank" rel="noreferrer" className="hover:underline">Demo</a>
                    </div>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-300">
                    {p.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-teal-400 uppercase border-b border-slate-800 pb-1 mb-2">
              EDUCATION
            </h2>
            <div className="space-y-2 text-xs">
              {educationData.map((edu, idx) => (
                <div key={idx} className="flex flex-wrap items-baseline justify-between">
                  <div>
                    <span className="font-bold text-white">{edu.degree}</span>
                    <span className="text-slate-400"> — {edu.institution}, {edu.location}</span>
                  </div>
                  <div className="font-mono text-teal-400">
                    <span className="text-emerald-400 font-semibold">{edu.score}</span> | {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
