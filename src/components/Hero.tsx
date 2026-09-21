import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowRight, Download, Mail, MapPin, Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { soundFx } from '../utils/soundController';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenResume }) => {
  const triggerConfetti = () => {
    soundFx.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#14b8a6', '#06b6d4', '#a855f7', '#10b981'],
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Top Floating Pill / Availability Badge */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-500/40 text-teal-300 text-xs font-medium backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Open to Summer / Full-time SWE Opportunities (2026 Grad)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs backdrop-blur-md">
            <MapPin size={13} className="text-rose-400" />
            <span>Bhubaneswar, Odisha, India</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center sm:text-left">
            <p className="text-xs sm:text-sm font-mono-code text-teal-400 tracking-wider uppercase mb-2 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles size={15} className="text-teal-400" />
              Full Stack Engineer &amp; B.Tech CSE Student
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent text-glow inline-block">
                {personalInfo.name}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              Passionate full-stack developer with hands-on production experience across{' '}
              <span className="text-teal-300 font-semibold">React.js</span>,{' '}
              <span className="text-cyan-300 font-semibold">TypeScript</span>,{' '}
              <span className="text-emerald-300 font-semibold">Django</span>,{' '}
              <span className="text-teal-300 font-semibold">Node.js</span>,{' '}
              <span className="text-violet-300 font-semibold">Three.js</span>, and{' '}
              <span className="text-teal-300 font-semibold">MySQL</span>.
              Proven track record of optimizing database query times by <span className="text-emerald-400 font-bold underline decoration-emerald-500/50">68%</span> and shipping end-to-end architectures from database schema design to pixel-perfect responsive UIs.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-8">
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="btn-glow px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400 hover:from-teal-400 hover:to-cyan-300 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/25 flex items-center gap-2 group transition-all duration-200"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <button
                onClick={() => {
                  triggerConfetti();
                  onOpenResume();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-teal-500/30 hover:border-teal-400 text-slate-100 font-semibold text-sm flex items-center gap-2 transition-all duration-200 shadow-md"
              >
                <Download size={16} className="text-teal-400" />
                <span>Download CV</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onOpenTerminal();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="px-4 py-3.5 rounded-xl bg-slate-950/80 hover:bg-teal-950/30 border border-slate-700/80 hover:border-teal-500/60 text-teal-300 font-mono text-xs flex items-center gap-2 transition-all duration-200"
                title="Launch CLI Interactive Terminal"
              >
                <Terminal size={15} />
                <span>~ Launch CLI</span>
              </button>
            </div>

            {/* Social Links & Quick Contacts */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 font-mono">CONNECT:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-teal-300 hover:border-teal-500/40 hover:scale-110 transition-all duration-200"
                title="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-110 transition-all duration-200"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:scale-110 transition-all duration-200"
                title="Send Email"
              >
                <Mail size={18} />
              </a>

              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs text-slate-400 font-mono">
                <span>Direct:</span>
                <span className="text-teal-300 font-sans">{personalInfo.phone}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Hologram Photo & Metrics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Holographic Portrait Card */}
            <div className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-teal-500/50 transition-all duration-300 shadow-2xl">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-teal-500/20 rounded-full blur-3xl group-hover:bg-teal-500/30 transition-all" />
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                {/* Photo Frame with Animated Glowing Ring */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal-400 via-cyan-400 to-purple-600 rounded-2xl blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-teal-400/60 bg-slate-950 shadow-inner">
                    <img
                      src="/profile.jpg"
                      alt="Gopinath Mandal"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    {/* Live Tech Overlay Badge */}
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md px-2 py-1 rounded-lg border border-teal-500/30 text-center">
                      <span className="text-[10px] font-mono font-bold text-teal-300 flex items-center justify-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        GOPINATH MANDAL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Bio Info Beside Photo */}
                <div className="text-center sm:text-left space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-teal-950/80 border border-teal-500/30 text-teal-300 text-[11px] font-mono font-semibold">
                    Full Stack Developer
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    B.Tech CSE &bull; 2026
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Trident Academy of Technology
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-xs">
                    <span className="text-slate-400">CGPA:</span>
                    <span className="text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      7.17 / 10.00
                    </span>
                  </div>
                </div>

              </div>

              {/* Mini Highlights Pills */}
              <div className="grid grid-cols-2 gap-2.5 mt-6 pt-5 border-t border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <Zap size={15} className="text-emerald-400 shrink-0" />
                  <div className="text-[11px] text-slate-300">
                    <span className="font-bold text-white block leading-tight">-68% Latency</span>
                    <span className="text-[10px] text-slate-400 font-mono">Query Optimized</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <ShieldCheck size={15} className="text-cyan-400 shrink-0" />
                  <div className="text-[11px] text-slate-300">
                    <span className="font-bold text-white block leading-tight">QR ERP Platform</span>
                    <span className="text-[10px] text-slate-400 font-mono">React + MySQL</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Core Stack Preview */}
            <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">CORE STACK:</span>
              <div className="flex items-center gap-2 text-teal-300 font-semibold">
                <span>React</span> &bull; <span>TypeScript</span> &bull; <span>Django</span> &bull; <span>Three.js</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
