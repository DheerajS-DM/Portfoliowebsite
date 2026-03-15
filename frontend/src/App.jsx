import React, { useState } from 'react';
import Tetris from './tetris.jsx'; // Importing our native engine!

const projects = [
  { 
    name: "Ballast", 
    description: "Autonomous risk engine designed for DeFi stablecoin analysis and vulnerability detection.", 
    link: "#", 
    underConstruction: true 
  },
  { 
    name: "TruthLens", 
    description: "System for the verification of mathematical proofs with a filed patent application.", 
    link: "#", 
    underConstruction: false 
  },
  { 
    name: "Stock Value Analyzer", 
    description: "Full-stack quantitative analysis application for tracking stock trends and valuations.", 
    link: "https://github.com/yourusername/stock-analyzer", 
    underConstruction: false 
  },
  { 
    name: "Supabase Data Dashboard", 
    description: "Dynamic frontend dashboard efficiently visualizing 1,000+ records fetched from Supabase.", 
    link: "https://github.com/yourusername/supabase-dashboard", 
    underConstruction: false 
  },
  { 
    name: "OrbitLens", 
    description: "Geospatial data web application demonstrating robust full-stack API integrations.", 
    link: "#", 
    underConstruction: true 
  },
  { 
    name: "Sustainability App", 
    description: "MERN stack application aimed at monitoring Earth’s climate and tracking deforestation.", 
    link: "#", 
    underConstruction: true 
  }
];

export default function Portfolio() {
  const [isTetrisOpen, setIsTetrisOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans relative">
      
      {/* MAIN PORTFOLIO SECTION */}
      <div 
        className={`absolute top-0 left-0 h-full overflow-y-auto p-6 sm:p-10 lg:p-16 transition-all duration-500 ease-in-out ${
          isTetrisOpen ? 'w-full lg:w-[70%]' : 'w-full'
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Dheeraj</h1>
            <p className="text-slate-400 mt-2 text-lg">Backend & Data Engineering Portfolio</p>
          </div>
          
          <button 
            className="bg-indigo-600 px-5 py-2.5 rounded-md font-bold text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2 z-50 relative"
            onClick={() => setIsTetrisOpen(!isTetrisOpen)}
          >
            {isTetrisOpen ? "Close Arcade" : "🎮 Play Tetris"}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl hover:border-indigo-500/50 transition-colors group flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-400 transition-colors">
                  {proj.name}
                </h2>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                  {proj.description}
                </p>
              </div>
              
              <div>
                {proj.underConstruction ? (
                  <span className="inline-flex items-center bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded text-xs font-bold border border-amber-500/20">
                    🚧 Under Construction
                  </span>
                ) : (
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-bold flex items-center gap-1"
                  >
                    View Source <span className="text-lg leading-none">&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TETRIS SIDEBAR */}
      <div 
        className={`
          absolute top-0 right-0 h-full bg-slate-950 shadow-2xl z-50
          transition-transform duration-500 ease-in-out flex flex-col overflow-hidden
          w-[85%] sm:w-[400px] lg:w-[30%] border-l border-slate-800
          ${isTetrisOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <Tetris />
      </div>

      {/* MOBILE OVERLAY */}
      {isTetrisOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsTetrisOpen(false)}
        />
      )}
    </div>
  );
}