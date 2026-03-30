import React, { useState } from 'react';
import Tetris from './tetris.jsx'; 

const projects = [
  { 
    name: "StableCoin-Risk-Analyzer", 
    description: "Autonomous risk engine designed for DeFi stablecoin analysis and vulnerability detection.", 
    github: "https://github.com/DheerajS-DM/stablecoin-risk-analyzer", 
    live: "https://hackathons-chi.vercel.app/",
    underConstruction: false,
    noLive: false // Has a frontend
  },
  { 
    name: "Assertion-Proof-Verification", 
    description: "Mathematical proof verification engine. Patent filed via VIT IPR portal.", 
    github: "https://github.com/DheerajS-DM/", 
    underConstruction: true,
    noLive: false
  },
  { 
    name: "Stock Value Analyzer", 
    description: "Full-stack quantitative analysis application for tracking stock trends and valuations.", 
    github: "https://github.com/DheerajS-DM/stock-analyzer-project", 
    live: "https://stock-analyzer-project-2vy6ychy1-dheerajs-dms-projects.vercel.app/", 
    underConstruction: false,
    noLive: false
  },
  { 
    name: "Node and Edge Bridge Analysis", 
    description: "Technical analysis of bridge structures using node and edge detection algorithms.", 
    github: "https://github.com/DheerajS-DM/Node_and_Edge_detection-Bridge_Analysis", 
    underConstruction: false,
    noLive: true // CLI/Analysis tool
  },
  { 
    name: "OrbitLens", 
    description: "Geospatial data web application demonstrating robust full-stack API integrations. Currently on static data working on live apis", 
    github: "https://github.com/DheerajS-DM/Orbit-Lens", 
    underConstruction: true,
    noLive: false 
  },
  { 
    name: "IRCTC Schedule Analyzer", 
    description: "Python Script with a Tkinter GUI analyzes using t-testing and ANOVA working on future AI implementation.", 
    github: "https://github.com/DheerajS-DM/IRCTC-Schedule-analyzer-inProgress-", 
    underConstruction: true,
    noLive: false 
  },
  {
    name: "Personal Portfolio Website",
    description: "This very website. Built with React and CSS, showcasing my projects and skills in a sleek, modern design.",
    github: "https://github.com/DheerajS-DM/Portfoliowebsite",
    live: "#",
    underConstruction: true,
    nolive: false,
  },
  {
    name: "Data Visualisation Dashboard",
    description:"Dashboard that has parsed through a json data file with 1 thousand records , using python and concurrency to supabase then displayed on a react frontend",
    github: "https://github.com/DheerajS-DM/visualisation-dashboard-inprogress-",
    live: "#",
    underConstruction: true,
    nolive: false,
  },
  {
    name: "GPU Visualizer",
    description: " NVIDIA GPU telemetry using Python and NVIDIA’s Management Library (NVML). The dashboard provides live monitoring of GPU metrics – such as utilization, clock  speed, temperature, power draw, and active compute processes – via a graphical interface built with Tkinter. ",
    github: "https://github.com/DheerajS-DM/GPU_analyzer",
    live: "#",
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 relative z-10">
          <div>
            <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500">
              DHEERAJ SUTRAM
            </h1>
            <p className="text-indigo-400 font-mono text-white text-sm tracking-widest uppercase font-bold">
            Contact me @ dheeraj22may@gmail.com | 9360229114
            </p>
          </div>
          
          <button 
            className="group relative bg-slate-900 border border-slate-800 px-6 py-3 rounded-full font-bold text-sm transition-all hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center gap-3 overflow-hidden"
            onClick={() => setIsTetrisOpen(!isTetrisOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="relative">{isTetrisOpen ? "TERMINATE ARCADE" : "INITIALIZE TETRIS"}</span>
            <div className={`w-2 h-2 rounded-full ${isTetrisOpen ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
          </button>
        </div>

        {/* BIO SECTION (TERMINAL STYLE) */}
        <div className="max-w-3xl mb-16 relative z-10">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800/50 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">bio.sh</span>
            </div>
            <div className="p-6 font-mono text-sm sm:text-base leading-relaxed">
              <p className="text-emerald-400 mb-2 font-bold tracking-tight">
                <span className="text-slate-500">➜</span> ~ <span className="text-white italic">"Currently trying and learning software to find my niche"</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 mt-4 text-slate-300">
                <p><span className="text-indigo-400 font-bold">EDUCATION:</span> BE Information Technology @ VIT</p>
                <p><span className="text-indigo-400 font-bold">CLASS:</span> 2028 Graduate</p>
                <p><span className="text-indigo-400 font-bold">FOCUS:</span> Mathematical Analysis and prediction with scope of AI</p>
                <p><span className="text-indigo-400 font-bold">STATUS:</span> Seeking 2026 Summer Internships</p>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 relative z-10 pl-1 border-l-2 border-indigo-500/50">
          Projects
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10 pb-20">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="group relative bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl border border-slate-800/50 hover:border-indigo-500/50 transition-all duration-500 flex flex-col justify-between overflow-hidden animate-float"
              style={{ animationDelay: `${idx * 0.5}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex gap-2 mb-4">
                  {proj.tags?.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-indigo-400/80 border border-indigo-500/20 px-2 py-0.5 rounded-md uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                  {proj.name}
                </h2>
                <p className="text-slate-400 mb-8 text-sm leading-relaxed font-medium">
                  {proj.description}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 relative z-10 border-t border-slate-800/50 pt-6">
                <a href={proj.github} target="_blank" rel="noreferrer" className="text-white text-xs font-black uppercase tracking-widest hover:text-indigo-400 transition-colors flex items-center gap-2">
                  Source <span className="text-indigo-500 text-lg">/</span>
                </a>
                {!proj.noLive && !proj.underConstruction && (
                  <a href={proj.live} target="_blank" rel="noreferrer" className="group/btn text-emerald-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-emerald-300 transition-colors">
                    Live Demo <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </a>
                )}
                {(proj.noLive || proj.underConstruction) && (
                  <span className="text-[10px] font-black text-slate-600 tracking-tighter uppercase italic">
                    {proj.underConstruction ? "// System Offline" : "// Core Logic Only"}
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