import React from 'react';
import { educationData } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/soundController';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-xs font-mono mb-4 backdrop-blur-md">
            <GraduationCap size={14} className="text-teal-400" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Education &amp; Qualifications
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Formal education in Computer Science and Technology with strong foundations in science and mathematics.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-card p-6 sm:p-7 rounded-2xl relative overflow-hidden group hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-teal-950 border border-teal-500/30 text-teal-300 text-xs font-bold font-mono">
                    {edu.badge || 'Academic Milestone'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar size={13} className="text-teal-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Degree Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-2">
                  {edu.degree}
                </h3>

                {/* Institution & Location */}
                <div className="space-y-1 mb-4 text-xs font-mono">
                  <div className="text-slate-300 flex items-center gap-1.5">
                    <BookOpen size={13} className="text-cyan-400" />
                    <span>{edu.institution}</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <MapPin size={13} className="text-rose-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="inline-block p-2.5 rounded-xl bg-slate-900 border border-teal-500/20 text-xs font-mono mb-4 w-full">
                  <span className="text-slate-400">Score / Performance: </span>
                  <span className="text-emerald-400 font-bold text-sm ml-1">
                    {edu.score}
                  </span>
                </div>

                {/* Details */}
                {edu.details && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {edu.details}
                  </p>
                )}
              </div>

              {/* Bottom Decoration */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Verified Credential</span>
                <CheckCircle2 size={14} className="text-teal-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
