import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Menu, X, FileText, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundController';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenResume }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'skills', 'experience', 'projects', 'education', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
    if (next) soundFx.playSuccess();
  };

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-lg shadow-teal-950/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => soundFx.playClick()}
          className="group flex items-center gap-3 text-slate-100 font-mono-code text-lg font-bold tracking-tight"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-teal-400/80 shadow-lg shadow-teal-500/25 group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300 bg-slate-900">
              <img
                src="/profile.jpg"
                alt="Gopinath Mandal"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight group-hover:text-teal-300 transition-colors flex items-center gap-1.5 text-base sm:text-lg">
              GOPINATH MANDAL
            </span>
            <span className="text-xs text-teal-400/80 font-sans font-normal tracking-wide">
              Full Stack Engineer &bull; 2026 Grad
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-teal-500/20 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-slate-950 font-semibold shadow-md shadow-teal-500/30'
                    : 'text-slate-300 hover:text-teal-300 hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundFx.playHover()}
            title={soundEnabled ? 'Disable UI Sound Effects' : 'Enable UI Sound Effects'}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-teal-300 hover:border-teal-500/40 transition-all duration-200"
          >
            {soundEnabled ? <Volume2 size={18} className="text-teal-400" /> : <VolumeX size={18} className="text-slate-500" />}
          </button>

          {/* Interactive Terminal Trigger */}
          <button
            onClick={() => {
              soundFx.playSuccess();
              onOpenTerminal();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-teal-500/30 text-teal-300 hover:bg-teal-950/40 hover:border-teal-400 text-xs font-mono font-medium shadow-sm transition-all duration-200"
          >
            <Terminal size={14} className="text-teal-400 animate-pulse" />
            <span>CLI ~</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenResume();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-200"
          >
            <FileText size={15} />
            <span>Resume</span>
            <Sparkles size={13} className="text-amber-300" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300"
          >
            {soundEnabled ? <Volume2 size={16} className="text-teal-400" /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-teal-500/20 px-6 py-5 mt-3 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 px-3 rounded-lg text-slate-200 hover:text-teal-300 hover:bg-slate-800/60 font-medium text-sm transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 border border-teal-500/30 text-teal-300 text-xs font-mono"
              >
                <Terminal size={14} />
                Terminal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold"
              >
                <FileText size={14} />
                View Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
