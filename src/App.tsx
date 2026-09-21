import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { ResumeModal } from './components/ResumeModal';
import { soundFx } from './utils/soundController';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Global hotkey: ~ (tilde) toggles Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        // Prevent toggle if currently typing in an input
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
          return;
        }
        e.preventDefault();
        soundFx.playClick();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-teal-500/30 selection:text-teal-200 overflow-x-hidden">
      
      {/* 3D WebGL Background Layer */}
      <ThreeCanvas interactive={true} />

      {/* Cyber Grid Background lines */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none opacity-40 z-0" />

      {/* Main Content Layout */}
      <div className="relative z-10">
        <Navbar
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        <main>
          <Hero
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
          />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact onOpenTerminal={() => setTerminalOpen(true)} />
        </main>

        <Footer />
      </div>

      {/* Floating Interactive Modals */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResume={() => {
          setTerminalOpen(false);
          setResumeOpen(true);
        }}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

    </div>
  );
};

export default App;
