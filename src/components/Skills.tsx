import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { Code2, Layout, Boxes, Server, Database, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/soundController';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="text-teal-400" size={20} />,
  Layout: <Layout className="text-cyan-400" size={20} />,
  Boxes: <Boxes className="text-purple-400" size={20} />,
  Server: <Server className="text-emerald-400" size={20} />,
  Database: <Database className="text-amber-400" size={20} />,
  Cpu: <Cpu className="text-rose-400" size={20} />,
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const categories = ['All', ...skillsData.map((c) => c.category)];

  const filteredCategories =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-xs font-mono mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-teal-400" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Skills &amp; Engineering Stack
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A comprehensive overview of programming languages, modern frameworks, 3D WebGL graphics, database management systems, and core computer science fundamentals.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25 scale-105'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-teal-500/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group) => (
            <div
              key={group.category}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-teal-500/40 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                  {iconMap[group.iconName] || <Code2 size={20} className="text-teal-400" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                    {group.category}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {group.skills.length} core proficiencies
                  </span>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {group.skills.map((skill) => {
                  const isHovered = activeSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => {
                        soundFx.playHover();
                        setActiveSkill(skill.name);
                      }}
                      onMouseLeave={() => setActiveSkill(null)}
                      className={`p-3 rounded-xl transition-all duration-200 cursor-default ${
                        isHovered
                          ? 'bg-slate-800/90 border border-teal-500/40 shadow-md shadow-teal-950/40 translate-x-1'
                          : 'bg-slate-900/50 border border-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            size={14}
                            className={isHovered ? 'text-teal-400' : 'text-slate-500'}
                          />
                          <span className="text-sm font-semibold text-slate-200">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-medium text-teal-400/90">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-700 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Micro Description */}
                      {skill.description && (
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Core Computer Science Highlights Banner */}
        <div className="mt-12 glass-card p-6 sm:p-8 rounded-2xl border border-teal-500/20 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                Academic Foundation
              </span>
              <h4 className="text-xl font-bold text-white">
                Core Computer Science &amp; Engineering Coursework
              </h4>
              <p className="text-xs text-slate-400 mt-2">
                Strong theoretical and practical background in systems, database design, algorithms, and networking protocols.
              </p>
            </div>

            <div className="md:col-span-8 flex flex-wrap gap-2.5">
              {[
                { name: 'Data Structures & Algorithms', highlight: 'Time & Space Complexity, Graphs, Trees' },
                { name: 'Database Management Systems (DBMS)', highlight: 'Relational Schema, Indexing, ACID' },
                { name: 'Operating Systems', highlight: 'Process Sync, Threads, Memory Mgmt' },
                { name: 'Computer Networks', highlight: 'OSI Model, TCP/IP, Sockets, HTTP/REST' },
                { name: 'Object-Oriented Programming (OOP)', highlight: 'Abstraction, Inheritance, Polymorphism' },
              ].map((course) => (
                <div
                  key={course.name}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-teal-400/60 transition-colors group cursor-default"
                >
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                    {course.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {course.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
