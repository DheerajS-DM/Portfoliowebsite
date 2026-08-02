import React, { useState } from 'react';
import Tetris from './tetris.jsx'; 

const projects = [
  { 
    name: "BrainQuant Generator", 
    description: "High-performance local alpha formula generation, AST native compilation to Polars, and continuous backtesting pipeline.", 
    github: "https://github.com/DheerajS-DM/alpha-generator", 
    tags: ["Python", "Polars", "Quant", "AST"],
    underConstruction: false,
    noLive: true
  },
  { 
    name: "Game Latency Router & Edge Arena", 
    description: "Multi-cloud machine-learning-based latency routing framework (AWS, GCP, Azure) and 2D arena game server with live telemetry.", 
    github: "https://github.com/DheerajS-DM", 
    tags: ["Node.js", "FastAPI", "Scikit-Learn", "Multi-Cloud"],
    underConstruction: false,
    noLive: true
  },
  { 
    name: "Stock Value Analyzer", 
    description: "Production-grade full-stack quantitative stock valuation platform utilizing a custom exponential decay algorithm.", 
    github: "https://github.com/DheerajS-DM/stock-analyzer-project", 
    live: "https://stock-analyzer-project-po4e2s65z-dheerajs-dms-projects.vercel.app/", 
    tags: ["FastAPI", "React", "Supabase", "yfinance"],
    underConstruction: false,
    noLive: false
  },
  { 
    name: "DaVinci AI Orchestrator", 
    description: "Multi-agent video editing orchestration pipeline for automated timeline assembly in DaVinci Resolve Studio.", 
    github: "https://github.com/DheerajS-DM", 
    tags: ["Python", "Node.js", "Blender API", "DaVinci API"],
    underConstruction: false,
    noLive: true
  },
  { 
    name: "Data Analytics Dashboard", 
    description: "High-density data visualization dashboard featuring multi-dimensional filtering and cloud-to-local fail-safe architecture.", 
    github: "https://github.com/DheerajS-DM/visualisation-dashboard-inprogress-", 
    tags: ["React", "FastAPI", "Supabase", "Vite"],
    underConstruction: false,
    noLive: true
  },
  {
    name: "GPU Visualizer",
    description: "Real-time NVIDIA GPU telemetry and performance monitor built using Python and NVML.",
    github: "https://github.com/DheerajS-DM/GPU_analyzer",
    tags: ["Python", "NVML", "Tkinter"],
    underConstruction: false,
    noLive: true
  }
];



export default function Portfolio() {
  const [isTetrisOpen, setIsTetrisOpen] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden font-sans relative">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />

      {/* MAIN PORTFOLIO SECTION */}
      <div 
        className={`absolute top-0 left-0 h-full overflow-y-auto p-6 sm:p-10 lg:p-16 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isTetrisOpen ? 'w-full lg:w-[70%]' : 'w-full'
        }`}
      >
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 relative z-10">
          <div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2 bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Dheeraj Sutram
            </h1>
            <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold">
              dheeraj22may@gmail.com | +91 9360229114
            </p>
          </div>
          
          <button 
            className="group relative bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2.5"
            onClick={() => setIsTetrisOpen(!isTetrisOpen)}
          >
            <span className="text-cyan-300 font-bold">{isTetrisOpen ? "Close Arcade" : "Play Tetris"}</span>
            <div className={`w-2.5 h-2.5 rounded-full ${isTetrisOpen ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`} />
          </button>
        </div>

        {/* BIO SECTION (TERMINAL STYLE WITH VIBRANT ACCENTS) */}
        <div className="max-w-3xl mb-14 relative z-10">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-cyan-400 tracking-wider ml-2 font-bold">about.sh</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">profile_v2.0</span>
            </div>
            <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed">
              <p className="text-emerald-400 mb-4 font-semibold">
                <span className="text-cyan-400">➜</span> <span className="text-slate-400">~</span> <span className="text-slate-200">Software Engineer specializing in quantitative algorithms, backtest systems, and distributed backend pipelines.</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-8 text-xs border-t border-slate-800/80 pt-4">
                <p><span className="text-cyan-400 font-bold">EDUCATION:</span> <span className="text-slate-200">BE IT @ VIT (2028)</span></p>
                <p><span className="text-purple-400 font-bold">FOCUS:</span> <span className="text-slate-200">Quant Systems & ML</span></p>
                <p><span className="text-emerald-400 font-bold">STATUS:</span> <span className="text-slate-200">Building & Exploring High-Performance Systems</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-6 relative z-10 font-bold flex items-center gap-2">
          <span className="text-emerald-400">//</span> Selected Projects
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10 pb-20">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="group bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-indigo-500 to-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="pl-2">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.tags?.map(tag => (
                    <span key={tag} className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                  {proj.name}
                </h2>
                <p className="text-slate-300 text-xs leading-relaxed mb-6 font-normal">
                  {proj.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4 border-t border-slate-800/80 pt-4 text-xs font-mono pl-2">
                <a href={proj.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                  Source Code →
                </a>
                {!proj.noLive && (
                  <a href={proj.live} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                    Live Demo →
                  </a>
                )}
                {proj.noLive && (
                  <span className="text-slate-500 text-[11px] font-medium">
                    // Core Logic Engine
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TETRIS SIDEBAR */}
      <div 
        className={`
          absolute top-0 right-0 h-full bg-slate-950/80 backdrop-blur-xl z-50
          transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col overflow-hidden
          w-[85%] sm:w-[450px] lg:w-[30%] border-l border-white/5
          ${isTetrisOpen ? 'translate-x-0 shadow-[-50px_0_100px_rgba(0,0,0,0.5)]' : 'translate-x-full'}
        `}
      >
        <Tetris />
      </div>

      {/* MOBILE OVERLAY */}
      {isTetrisOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-700"
          onClick={() => setIsTetrisOpen(false)}
        />
      )}
    </div>
  );
}