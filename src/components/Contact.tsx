import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { soundFx } from '../utils/soundController';
import confetti from 'canvas-confetti';

interface ContactProps {
  onOpenTerminal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenTerminal }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (text: string, field: string) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playClick();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      soundFx.playSuccess();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-xs font-mono mb-4 backdrop-blur-md">
            <Mail size={14} className="text-teal-400" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Have an open role, internship opportunity, project collaboration, or tech inquiry? Feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden border-teal-500/20">
              <h3 className="text-xl font-bold text-white mb-2">
                Direct Contact Channels
              </h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Available for internships, full-time engineering positions (2026 graduation), and full-stack development consulting.
              </p>

              <div className="space-y-4">
                
                {/* Email Box */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-teal-950 border border-teal-500/30 text-teal-400">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">EMAIL ADDRESS</div>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-xs sm:text-sm font-bold text-slate-200 hover:text-teal-300 transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalInfo.email, 'email')}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone Box */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">PHONE / WHATSAPP</div>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="text-xs sm:text-sm font-bold text-slate-200 hover:text-cyan-300 transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalInfo.phone, 'phone')}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    title="Copy Phone Number"
                  >
                    {copiedField === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">CURRENT BASE</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      {personalInfo.location}
                    </div>
                  </div>
                </div>

              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-white text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>

            </div>

            {/* Quick Terminal Trigger CTA */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-950 text-teal-400">
                  <Terminal size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Prefer Command Line?</div>
                  <div className="text-[11px] text-slate-400 font-mono">Execute `hire` or `skills` in CLI</div>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onOpenTerminal();
                }}
                className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 text-xs font-mono font-bold transition-all"
              >
                Open Terminal
              </button>
            </div>

          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border-teal-500/30 relative">
              <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-800">
                <MessageSquare className="text-teal-400" size={20} />
                <h3 className="text-lg font-bold text-white">
                  Send a Direct Message
                </h3>
              </div>

              {isSent && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <Sparkles size={16} className="text-amber-300 shrink-0" />
                  <span>
                    Thank you! Your message has been sent successfully. Gopinath will get back to you promptly!
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 text-white text-xs font-mono placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Email Address <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 text-white text-xs font-mono placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Internship Opportunity / Full Stack SWE Role"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 text-white text-xs font-mono placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message <span className="text-teal-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message or role details here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-teal-400 text-white text-xs font-mono placeholder-slate-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-glow w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400 hover:from-teal-400 hover:to-cyan-300 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 disabled:opacity-60 transition-all"
                >
                  <Send size={15} />
                  <span>{isSending ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
