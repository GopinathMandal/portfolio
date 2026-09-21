import React, { useState } from 'react';
import { experienceData } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Zap, Gauge, Layers, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/soundController';

export const Experience: React.FC = () => {
  const [activeBenchmark, setActiveBenchmark] = useState<'optimized' | 'unoptimized'>('optimized');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedTime, setSimulatedTime] = useState<number | null>(null);

  const exp = experienceData[0];

  const runBenchmark = (mode: 'optimized' | 'unoptimized') => {
    soundFx.playClick();
    setActiveBenchmark(mode);
    setIsSimulating(true);
    setSimulatedTime(null);

    const targetTime = mode === 'unoptimized' ? 4.8 : 1.5;
    const simDuration = mode === 'unoptimized' ? 480 : 160; // Ultra-fast realistic benchmark response
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / simDuration);
      const currentTime = Number((progress * targetTime).toFixed(2));

      if (progress >= 1) {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulatedTime(targetTime);
        soundFx.playSuccess();
      } else {
        setSimulatedTime(currentTime);
      }
    }, 16);
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-xs font-mono mb-4 backdrop-blur-md">
            <Briefcase size={14} className="text-teal-400" />
            <span>INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Work Experience &amp; Impact
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Real-world software engineering experience shipping full-stack features, integrating Django/MySQL backends, and dramatically improving web application performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Experience Card */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-teal-500/40 transition-all duration-300">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-800">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-2">
                    Production Internship
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono mt-2">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Briefcase size={13} className="text-teal-400" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-rose-400" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bullet Highlights */}
              <div className="space-y-4 mb-6">
                {exp.description.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-teal-950 border border-teal-500/40 text-teal-400 shrink-0">
                      <CheckCircle2 size={13} />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies Used */}
              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-400 block mb-2.5">
                  TECH STACK &amp; METHODOLOGIES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono hover:border-teal-500/40 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Benchmark Simulator */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Latency Simulator Card */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden border-teal-500/30">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Gauge className="text-emerald-400" size={18} />
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Query Latency Benchmark
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  Live Test
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Test the exact query optimization achieved during the internship by running the benchmark simulator below:
              </p>

              {/* Mode Selector - Optimized Response Time First */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => runBenchmark('optimized')}
                  disabled={isSimulating}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeBenchmark === 'optimized'
                      ? 'bg-emerald-950/50 border-emerald-500/70 text-white shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-400/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-mono text-emerald-400 font-bold flex items-center justify-between">
                    <span>1. OPTIMIZED (Current)</span>
                    <span className="text-[10px] bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-300">Fast ⚡</span>
                  </div>
                  <div className="text-xl font-extrabold text-emerald-300 mt-1">~1.5 Seconds</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Indexed columns &amp; query deduplication (-68%)</div>
                </button>

                <button
                  onClick={() => runBenchmark('unoptimized')}
                  disabled={isSimulating}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeBenchmark === 'unoptimized'
                      ? 'bg-rose-950/40 border-rose-500/60 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-mono text-rose-400 font-semibold">2. BEFORE (Legacy)</div>
                  <div className="text-xl font-bold text-rose-300/90 mt-1">~4.8 Seconds</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Redundant queries &amp; unindexed table</div>
                </button>
              </div>

              {/* Benchmark Runner Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Simulation Status:</span>
                  <span className={isSimulating ? 'text-amber-400 animate-pulse' : 'text-emerald-400 font-semibold'}>
                    {isSimulating ? 'Executing DB Query...' : 'Completed'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-3 relative">
                  <div
                    className={`h-full transition-all duration-100 ${
                      activeBenchmark === 'optimized'
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-400'
                        : 'bg-gradient-to-r from-amber-500 to-rose-500'
                    }`}
                    style={{
                      width: isSimulating
                        ? `${Math.min(100, ((simulatedTime || 0) / (activeBenchmark === 'optimized' ? 1.5 : 4.8)) * 100)}%`
                        : '100%',
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">
                    Execution Time: <span className="font-bold text-white">{simulatedTime !== null ? `${simulatedTime}s` : activeBenchmark === 'optimized' ? '1.50s' : '4.80s'}</span>
                  </span>

                  <button
                    onClick={() => runBenchmark(activeBenchmark)}
                    disabled={isSimulating}
                    className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={12} className={isSimulating ? 'animate-spin' : ''} />
                    <span>Run Test</span>
                  </button>
                </div>
              </div>

              {/* Stat callout */}
              <div className="mt-4 p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center gap-3">
                <Zap className="text-teal-400 shrink-0" size={20} />
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-white">68.75% Performance Gain:</span> Real-time reports generated 3.2x faster for employer analytics dashboards.
                </div>
              </div>

            </div>

            {/* Responsive Engineering Callout */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 shrink-0">
                <Layers size={22} />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">
                  Cross-Device 320px Responsive Architecture
                </h5>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Engineered front-end layouts using CSS3 Grid, Flexbox, and Bootstrap to ensure seamless UX even on ultra-compact mobile viewports.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
