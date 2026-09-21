import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/portfolioData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Sparkles,
  QrCode,
  CheckCircle2,
  Users,
  Briefcase,
  Clock,
  RefreshCw,
  FileCheck,
  Play,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { soundFx } from '../utils/soundController';
import confetti from 'canvas-confetti';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const Projects: React.FC = () => {
  // QR ERP Interactive State
  const [qrToken, setQrToken] = useState<string>('SESSION-CSE-2026-A8F2');
  const [qrTimeLeft, setQrTimeLeft] = useState<number>(45);
  const [attendanceCount, setAttendanceCount] = useState<number>(42);
  const [recentStudent, setRecentStudent] = useState<string>('Gopinath Mandal (2022CS082)');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Job Portal Interactive State
  const [activeRole, setActiveRole] = useState<'seeker' | 'employer'>('seeker');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [resumeUploaded, setResumeUploaded] = useState<boolean>(false);
  const [appliedJobId, setAppliedJobId] = useState<number | null>(null);

  // Timer for QR code regeneration
  useEffect(() => {
    const timer = setInterval(() => {
      setQrTimeLeft((prev) => {
        if (prev <= 1) {
          const newToken = `SESSION-CSE-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
          setQrToken(newToken);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateScan = () => {
    soundFx.playClick();
    setIsScanning(true);
    const mockStudents = [
      'Ananya Sharma (2022CS014)',
      'Subham Patnaik (2022CS045)',
      'Rohan Dash (2022CS091)',
      'Sneha Mohanty (2022CS032)',
      'Pooja Biswal (2022CS104)',
    ];
    const picked = mockStudents[Math.floor(Math.random() * mockStudents.length)];

    setTimeout(() => {
      setIsScanning(false);
      setRecentStudent(picked);
      setAttendanceCount((prev) => Math.min(60, prev + 1));
      soundFx.playSuccess();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#14b8a6', '#06b6d4'],
      });
    }, 70);
  };

  const handleRegenerateQR = () => {
    soundFx.playClick();
    const newToken = `SESSION-CSE-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setQrToken(newToken);
    setQrTimeLeft(60);
  };

  // Chart Data for QR ERP
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Today'],
    datasets: [
      {
        label: 'Present Students',
        data: [52, 48, 55, 50, 53, attendanceCount],
        backgroundColor: 'rgba(20, 184, 166, 0.8)',
        borderColor: '#14b8a6',
        borderRadius: 6,
      },
      {
        label: 'Absent',
        data: [8, 12, 5, 10, 7, 60 - attendanceCount],
        backgroundColor: 'rgba(244, 63, 94, 0.4)',
        borderColor: '#f43f5e',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { size: 11 } },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        max: 65,
      },
    },
  };

  // Job portal mock listings
  const jobListings = [
    { id: 1, title: 'Full Stack React & Node Developer', company: 'TechNova Cloud', type: 'Full-time', tag: 'React.js', exp: '0-2 Yrs', match: '98%' },
    { id: 2, title: 'Backend Django & MySQL Engineer', company: 'DataSphere Labs', type: 'Remote', tag: 'Django', exp: '0-1 Yrs', match: '95%' },
    { id: 3, title: 'Frontend TypeScript Engineer', company: 'Vortex Interactive', type: 'Full-time', tag: 'TypeScript', exp: 'Fresher / 2026', match: '92%' },
  ];

  const filteredJobs = selectedTag === 'All' ? jobListings : jobListings.filter((j) => j.tag === selectedTag);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-xs font-mono mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-teal-400" />
            <span>FEATURED ENGINEERING PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            End-to-End Production Systems
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Independently architected and deployed full-stack web applications with live interactive simulators below.
          </p>
        </div>

        {/* Project 1: QR ERP Attendance Management System */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border-teal-500/30 mb-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-teal-950 border border-teal-500/40 text-teal-300 text-xs font-bold font-mono">
                  {projectsData[0].badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  React.js &bull; TypeScript &bull; Express &bull; MySQL &bull; Chart.js
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-teal-300 transition-colors">
                {projectsData[0].title}
              </h3>
              <p className="text-sm text-teal-400 font-mono mt-1">
                {projectsData[0].subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={projectsData[0].githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-teal-400 text-slate-200 hover:text-white text-xs font-mono font-medium flex items-center gap-2 transition-all"
              >
                <GithubIcon size={15} />
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Architecture & Features */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {projectsData[0].description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  KEY ARCHITECTURAL HIGHLIGHTS:
                </h4>
                {projectsData[0].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-teal-950 border border-teal-500/40 text-teal-400 shrink-0">
                      <CheckCircle2 size={13} />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {h}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Pills */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-2">TECHNOLOGIES USED:</span>
                <div className="flex flex-wrap gap-2">
                  {projectsData[0].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-teal-950/60 border border-teal-500/30 text-teal-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Simulator Widget */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-teal-500/30 shadow-xl space-y-5">
                
                {/* Simulator Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <QrCode className="text-teal-400" size={20} />
                    <span className="text-sm font-bold text-white font-mono">
                      LIVE QR SESSION SIMULATOR
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-500/30">
                    Interactive Demo
                  </span>
                </div>

                {/* QR Code & Session Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  
                  {/* Generated QR Box */}
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950 border border-slate-800 relative">
                    <div className="relative p-3 bg-white rounded-lg shadow-inner">
                      {/* Stylized Simulated QR code SVG */}
                      <svg width="110" height="110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="5" width="28" height="28" fill="#030712" rx="4" />
                        <rect x="10" y="10" width="18" height="18" fill="white" rx="2" />
                        <rect x="14" y="14" width="10" height="10" fill="#0d9488" rx="1" />

                        <rect x="67" y="5" width="28" height="28" fill="#030712" rx="4" />
                        <rect x="72" y="10" width="18" height="18" fill="white" rx="2" />
                        <rect x="76" y="14" width="10" height="10" fill="#0d9488" rx="1" />

                        <rect x="5" y="67" width="28" height="28" fill="#030712" rx="4" />
                        <rect x="10" y="72" width="18" height="18" fill="white" rx="2" />
                        <rect x="14" y="76" width="10" height="10" fill="#0d9488" rx="1" />

                        <rect x="38" y="8" width="6" height="6" fill="#030712" />
                        <rect x="48" y="8" width="6" height="6" fill="#030712" />
                        <rect x="38" y="18" width="6" height="6" fill="#0d9488" />
                        <rect x="48" y="24" width="6" height="6" fill="#030712" />
                        <rect x="8" y="38" width="6" height="6" fill="#030712" />
                        <rect x="18" y="48" width="6" height="6" fill="#0d9488" />
                        <rect x="38" y="38" width="8" height="8" fill="#030712" />
                        <rect x="52" y="42" width="6" height="6" fill="#0d9488" />
                        <rect x="68" y="38" width="6" height="6" fill="#030712" />
                        <rect x="78" y="48" width="8" height="8" fill="#030712" />
                        <rect x="38" y="68" width="6" height="6" fill="#030712" />
                        <rect x="48" y="78" width="8" height="8" fill="#0d9488" />
                        <rect x="68" y="68" width="6" height="6" fill="#030712" />
                        <rect x="78" y="78" width="6" height="6" fill="#030712" />
                      </svg>
                      <div className="absolute inset-0 border-2 border-teal-500/40 rounded-lg animate-pulse pointer-events-none" />
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-teal-400">
                      <Clock size={11} />
                      <span>Expires in {qrTimeLeft}s</span>
                    </div>
                  </div>

                  {/* Controls & Live Check-in Feedback */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">SESSION TOKEN:</div>
                      <div className="text-xs font-mono font-bold text-teal-300 truncate bg-slate-950 p-1.5 rounded border border-slate-800">
                        {qrToken}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSimulateScan}
                        disabled={isScanning}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-md disabled:opacity-60"
                      >
                        <Play size={13} />
                        <span>{isScanning ? 'Verifying...' : 'Simulate Scan'}</span>
                      </button>

                      <button
                        onClick={handleRegenerateQR}
                        title="Regenerate QR Code"
                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-teal-300 hover:border-teal-500/40 transition-colors"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>

                    <div className="p-2.5 rounded-lg bg-teal-950/30 border border-teal-500/20 text-[11px]">
                      <span className="text-slate-400 block font-mono">LATEST CHECK-IN:</span>
                      <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        {recentStudent}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Live Chart.js Analytics Dashboard */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                      <Users size={14} className="text-teal-400" />
                      Live Attendance Analytics (Chart.js)
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {attendanceCount} / 60 ({Math.round((attendanceCount / 60) * 100)}%)
                    </span>
                  </div>

                  <div className="h-44 w-full bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <Bar data={barChartData} options={chartOptions} />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Project 2: Job Portal Web Application */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border-cyan-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono">
                  {projectsData[1].badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Django &bull; SQLite &bull; Bootstrap &bull; Tailwind CSS &bull; RESTful ORM
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                {projectsData[1].title}
              </h3>
              <p className="text-sm text-cyan-400 font-mono mt-1">
                {projectsData[1].subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={projectsData[1].githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-mono font-medium flex items-center gap-2 transition-all"
              >
                <GithubIcon size={15} />
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Architecture & Features */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {projectsData[1].description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  KEY ARCHITECTURAL HIGHLIGHTS:
                </h4>
                {projectsData[1].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 shrink-0">
                      <CheckCircle2 size={13} />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {h}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Pills */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-2">TECHNOLOGIES USED:</span>
                <div className="flex flex-wrap gap-2">
                  {projectsData[1].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Role Switcher & Resume Validator */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl space-y-5">
                
                {/* Simulator Header & Dual Role Tabs */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Briefcase className="text-cyan-400" size={20} />
                    <span className="text-sm font-bold text-white font-mono">
                      PORTAL ROLE SANDBOX
                    </span>
                  </div>

                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setActiveRole('seeker');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        activeRole === 'seeker'
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Job Seeker
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setActiveRole('employer');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        activeRole === 'employer'
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Employer
                    </button>
                  </div>
                </div>

                {activeRole === 'seeker' ? (
                  /* Job Seeker View */
                  <div className="space-y-4">
                    {/* Search & Tag filter */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">Filter Stack:</span>
                      {['All', 'React.js', 'Django', 'TypeScript'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            soundFx.playClick();
                            setSelectedTag(tag);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                            selectedTag === tag
                              ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold'
                              : 'bg-slate-950 border border-slate-800 text-slate-400'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Job Cards */}
                    <div className="space-y-2.5">
                      {filteredJobs.map((job) => (
                        <div
                          key={job.id}
                          className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between hover:border-cyan-500/40 transition-all"
                        >
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-2">
                              {job.title}
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                                {job.type}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {job.company} &bull; {job.exp} &bull; Match: <span className="text-emerald-400">{job.match}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              soundFx.playSuccess();
                              setAppliedJobId(job.id);
                              confetti({ particleCount: 30, spread: 40 });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                              appliedJobId === job.id
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                            }`}
                          >
                            {appliedJobId === job.id ? 'Applied ✓' : 'Quick Apply'}
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Resume Upload Validator Demo */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <FileCheck size={16} className={resumeUploaded ? 'text-emerald-400' : 'text-slate-500'} />
                        <span className="text-slate-300 font-mono">
                          {resumeUploaded ? 'Gopinath_Mandal_CV.pdf (Validated < 2MB)' : 'Upload Resume (PDF/DOCX)'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          soundFx.playSuccess();
                          setResumeUploaded(true);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
                      >
                        {resumeUploaded ? 'Verified' : 'Simulate Upload'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Employer View */
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                          Employer Dashboard Metrics
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400">
                          Active Role: Recruiter
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center font-mono">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="text-lg font-bold text-white">12</div>
                          <div className="text-[10px] text-slate-400">Active Jobs</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="text-lg font-bold text-teal-400">148</div>
                          <div className="text-[10px] text-slate-400">Applicants</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="text-lg font-bold text-emerald-400">99.4%</div>
                          <div className="text-[10px] text-slate-400">RBAC Secure</div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-300 leading-snug">
                        <span className="font-semibold text-white">Role-Based Access Control:</span> Employers manage job listings and candidate pipelines with strict permissions isolated from applicant access.
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
