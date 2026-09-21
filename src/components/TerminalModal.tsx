import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';
import { personalInfo, skillsData, experienceData, projectsData, educationData } from '../data/portfolioData';
import { soundFx } from '../utils/soundController';
import confetti from 'canvas-confetti';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface OutputLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onOpenResume }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<OutputLine[]>([
    {
      id: 'welcome',
      type: 'output',
      content: (
        <div>
          <div className="text-teal-400 font-bold">
            Gopinath Mandal CLI [Version 2.0.26]
          </div>
          <div className="text-slate-400 text-xs mt-1">
            Type <span className="text-cyan-300 font-semibold">help</span> to view available commands, or try <span className="text-amber-300 font-semibold">hire</span>, <span className="text-emerald-300 font-semibold">skills</span>, <span className="text-purple-300 font-semibold">projects</span>.
          </div>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const id = Date.now().toString();

    const newHistory: OutputLine[] = [
      ...history,
      { id: `${id}-in`, type: 'input', content: `$ ${cmd}` },
    ];

    if (cmd.trim()) {
      setCmdHistory((prev) => [...prev, cmd.trim()]);
      setHistoryIndex(-1);
    }

    switch (trimmed) {
      case 'help':
        soundFx.playBeep();
        newHistory.push({
          id: `${id}-out`,
          type: 'output',
          content: (
            <div className="space-y-1.5 text-xs">
              <div className="text-teal-300 font-bold mb-2">Available Commands:</div>
              <div><span className="text-cyan-400 font-semibold w-24 inline-block">skills</span> - Display all technical skills &amp; stack</div>
              <div><span className="text-cyan-400 font-semibold w-24 inline-block">projects</span> - View full-stack projects &amp; architecture</div>
              <div><span className="text-cyan-400 font-semibold w-24 inline-block">experience</span> - Internship &amp; query optimization details</div>
              <div><span className="text-cyan-400 font-semibold w-24 inline-block">education</span> - Academic background and CGPA</div>
              <div><span className="text-cyan-400 font-semibold w-24 inline-block">contact</span> - Phone, email, GitHub and LinkedIn</div>
              <div><span className="text-cyan-400 font-semibold w-24 inline-block">cv</span> - View and download Resume</div>
              <div><span className="text-cyan-400 font-semibold w-24 inline-block">hire</span> - Interactive recruiter prompt</div>
              <div><span className="text-cyan-400 font-semibold w-24 inline-block">clear</span> - Clear terminal window</div>
            </div>
          ),
        });
        break;

      case 'skills':
        soundFx.playBeep();
        newHistory.push({
          id: `${id}-out`,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs">
              {skillsData.map((c) => (
                <div key={c.category}>
                  <span className="text-teal-400 font-bold">{c.category}:</span>{' '}
                  <span className="text-slate-300">
                    {c.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'projects':
        soundFx.playBeep();
        newHistory.push({
          id: `${id}-out`,
          type: 'output',
          content: (
            <div className="space-y-3 text-xs">
              {projectsData.map((p) => (
                <div key={p.id} className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <div className="text-teal-300 font-bold">{p.title}</div>
                  <div className="text-slate-400 mt-0.5">{p.description}</div>
                  <div className="text-cyan-400 text-[11px] mt-1 font-mono">
                    Stack: {p.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'experience':
        soundFx.playBeep();
        newHistory.push({
          id: `${id}-out`,
          type: 'output',
          content: (
            <div className="text-xs space-y-2">
              <div className="text-teal-300 font-bold">
                {experienceData[0].role} ({experienceData[0].period})
              </div>
              <div className="text-slate-300">
                - Reduced report query latency from ~4.8s to ~1.5s (-68% latency reduction).
              </div>
              <div className="text-slate-300">
                - Built responsive front-end pages down to 320px width across mobile/desktop.
              </div>
              <div className="text-slate-300">
                - Integrated Django &amp; MySQL backend with real-time REST API endpoints.
              </div>
            </div>
          ),
        });
        break;

      case 'education':
        soundFx.playBeep();
        newHistory.push({
          id: `${id}-out`,
          type: 'output',
          content: (
            <div className="text-xs space-y-2">
              {educationData.map((edu, idx) => (
                <div key={idx}>
                  <div className="text-teal-300 font-bold">{edu.degree}</div>
                  <div className="text-slate-400">{edu.institution} ({edu.period}) &bull; {edu.score}</div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'contact':
        soundFx.playBeep();
        newHistory.push({
          id: `${id}-out`,
          type: 'output',
          content: (
            <div className="text-xs space-y-1.5 font-mono">
              <div><span className="text-teal-400">Email:</span> {personalInfo.email}</div>
              <div><span className="text-teal-400">Phone:</span> {personalInfo.phone}</div>
              <div><span className="text-teal-400">GitHub:</span> {personalInfo.github}</div>
              <div><span className="text-teal-400">LinkedIn:</span> {personalInfo.linkedin}</div>
              <div><span className="text-teal-400">Location:</span> {personalInfo.location}</div>
            </div>
          ),
        });
        break;

      case 'cv':
      case 'resume':
        soundFx.playSuccess();
        onOpenResume();
        newHistory.push({
          id: `${id}-out`,
          type: 'success',
          content: <div className="text-emerald-400 text-xs">Opening resume modal...</div>,
        });
        break;

      case 'hire':
        soundFx.playSuccess();
        confetti({ particleCount: 70, spread: 60 });
        newHistory.push({
          id: `${id}-out`,
          type: 'success',
          content: (
            <div className="p-3 rounded-lg bg-teal-950/80 border border-teal-500/40 text-xs space-y-1 text-teal-200">
              <div className="font-bold text-teal-300 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400" />
                Excellent decision! Gopinath Mandal is open for 2026 roles &amp; internships.
              </div>
              <div>Contact directly via Email: <a href={`mailto:${personalInfo.email}`} className="text-cyan-300 underline">{personalInfo.email}</a> or Phone: <span className="text-emerald-400 font-bold">{personalInfo.phone}</span>.</div>
            </div>
          ),
        });
        break;

      case 'clear':
      case 'cls':
        soundFx.playClick();
        setHistory([]);
        setInputVal('');
        return;

      case '':
        break;

      default:
        soundFx.playClick();
        newHistory.push({
          id: `${id}-err`,
          type: 'error',
          content: (
            <div className="text-rose-400 text-xs">
              Command not recognized: <span className="text-white">{cmd}</span>. Type <span className="text-cyan-300 underline font-semibold">help</span> to see available commands.
            </div>
          ),
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(cmdHistory[nextIndex]);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-950 border border-teal-500/40 shadow-2xl shadow-teal-950/60 overflow-hidden flex flex-col h-[520px]">
        
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-slate-300 font-semibold ml-2 flex items-center gap-1.5">
              <TerminalIcon size={14} className="text-teal-400" />
              gopinath@mandal-portfolio: ~ (bash)
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Content / Logs */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3">
          {history.map((line) => (
            <div
              key={line.id}
              className={`${
                line.type === 'input'
                  ? 'text-cyan-300 font-semibold'
                  : line.type === 'error'
                  ? 'text-rose-400'
                  : line.type === 'success'
                  ? 'text-emerald-400'
                  : 'text-slate-200'
              }`}
            >
              {line.content}
            </div>
          ))}
        </div>

        {/* Command Input Prompt */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              soundFx.playHover();
              setInputVal(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. 'help', 'skills', 'projects', 'hire')..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition-colors"
          >
            <CornerDownLeft size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
