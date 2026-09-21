import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { soundFx } from '../utils/soundController';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-teal-500/20">
            GM
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{personalInfo.name}</span>
              <span className="text-[10px] font-mono text-teal-400 bg-teal-950 px-1.5 py-0.5 rounded border border-teal-500/30">
                Portfolio 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Engineered with TypeScript, Tailwind CSS, &amp; Three.js
            </p>
          </div>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-teal-300 transition-colors flex items-center gap-1"
          >
            <GithubIcon size={14} /> GitHub
          </a>
          <span>&bull;</span>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            <LinkedinIcon size={14} /> LinkedIn
          </a>
          <span>&bull;</span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <Mail size={14} /> Email
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundFx.playHover()}
          className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-teal-500/40 hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-mono group"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
