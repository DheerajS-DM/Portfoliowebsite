import React, { useState, useMemo } from 'react';
import Tetris from './tetris.jsx';
import ConstellationBackground from './components/ConstellationBackground.jsx';

const projects = [
  {
    rank: 1,
    name: "BrainQuant: Alpha Formula Generator & Native C-Compiler",
    domain: "Quantitative Finance, Compilers & HPC",
    category: "Quant & FinTech",
    description: "High-performance alpha mining engine with formal grammar AST parsing, dynamic C-transpilation, native GCC/Clang JIT compilation, and vectorized backtesting.",
    github: "https://github.com/DheerajS-DM/alpha-generator",
    tags: ["C/C++", "Python", "Quant Finance", "AST Compilers", "NumPy", "HPC"],
    highlight: "JIT C-Transpiler & Backtest Engine",
    noLive: true
  },
  {
    rank: 2,
    name: "PromptGuard — Formal Security Engine & AI Harness",
    domain: "AI Security, Formal Language Theory & Desktop Systems",
    category: "AI & Formal Methods",
    description: "Deterministic microsecond security engine in Rust and Tauri v2 using Formal Language Theory (DFAs) to intercept adversarial prompt injections before reaching LLMs.",
    github: "https://github.com/DheerajS-DM/PromptGuard-Formal-Security-Engine",
    tags: ["Rust", "Tauri v2", "Formal Methods", "AI Security", "React 19", "Gemini API"],
    highlight: "Microsecond DFA Defense",
    noLive: true
  },
  {
    rank: 3,
    name: "Assertion-Level Handwritten Proof Verification Engine",
    domain: "Neuro-Symbolic AI, Automated Reasoning & Computer Vision",
    category: "AI & Formal Methods",
    description: "Neuro-symbolic verification engine combining LaTeX OCR, SymPy symbolic AST parsing, and Z3 SMT solver for deterministic mathematical proof verification.",
    github: "https://github.com/DheerajS-DM/Assertion-level-Handwriting-Proof-Verification-Engine",
    tags: ["Python", "Z3 SMT Solver", "SymPy", "LaTeX OCR", "FastAPI", "WebSockets"],
    highlight: "Patent: R-IPR0003006P (UCSD)",
    noLive: true
  },
  {
    rank: 4,
    name: "Checkpoint-Based Process Recovery Engine & DPC-RR Scheduler",
    domain: "Systems Programming, Operating Systems & Fault Tolerance",
    category: "Systems & HPC",
    description: "Userspace process resurrection engine using POSIX mprotect + SIGSEGV dirty-page tracking, ucontext_t register state snapshots, and 4-tier dynamic priority scheduler.",
    github: "https://github.com/DheerajS-DM/os-process-checkpoint",
    tags: ["C", "Linux Kernel / POSIX", "Memory Management", "Fault Tolerance", "PyQt6"],
    highlight: "Transparent Process Resurrection",
    noLive: true
  },
  {
    rank: 5,
    name: "Cloud AI Collaboration Platform & Ephemeral GPU Pipeline",
    domain: "Distributed Systems, Cloud Architecture & Real-Time Collab",
    category: "Full-Stack & Cloud",
    description: "Event-driven real-time document collaboration with decentralized CRDTs (Yjs) and vector clocks, powered by AWS Karpenter ephemeral Spot GPU provisioning and Kafka.",
    github: "https://github.com/DheerajS-DM/cloud-AI-colllab-platform",
    tags: ["Kubernetes (EKS)", "AWS Karpenter", "Kafka", "CRDTs", "FastAPI", "Next.js 14"],
    highlight: "Ephemeral Spot GPU Orchestration",
    noLive: true
  },
  {
    rank: 6,
    name: "Game Latency Router — Edge-Optimized Multi-Cloud Arena",
    domain: "Networking, Cloud Infrastructure & Machine Learning",
    category: "Systems & HPC",
    description: "Intelligent matchmaking and dynamic traffic relay framework using Scikit-Learn K-Means clustering across AWS, GCP, and Azure with live WebSocket telemetry swarms.",
    github: "https://github.com/DheerajS-DM/ML-based-latency-router",
    tags: ["Python", "FastAPI", "Scikit-Learn", "Multi-Cloud", "WebSockets", "Docker"],
    highlight: "K-Means Multi-Cloud Matchmaking",
    noLive: true
  },
  {
    rank: 7,
    name: "Physics-Informed Civil Digital Twin & Bridge Health AI",
    domain: "Physics-Informed AI, Structural Simulation & Operations Research",
    category: "Vision & Simulation",
    description: "Civil infrastructure digital twin pairing OpenSeesPy finite element simulation with Partial Order Planning (POP) and Bayesian utility theory to optimize bridge repairs.",
    github: "https://github.com/DheerajS-DM/visualisation-dashboard-inprogress-",
    tags: ["OpenSeesPy", "Physics-Informed AI", "Partial Order Planning", "PyQt6", "VTK"],
    highlight: "FEA Simulation + AI Planning",
    noLive: true
  },
  {
    rank: 8,
    name: "Stock Value Analyzer: Proprietary Exponential Decay Engine",
    domain: "Equity Research, Quantitative Valuation & Data Visualization",
    category: "Quant & FinTech",
    description: "Production quantitative equity valuation engine applying time-weighted exponential decay weighting to multi-year fundamentals, sub-100ms FastAPI cache, and live charts.",
    github: "https://github.com/DheerajS-DM/stock-analyzer-project",
    live: "https://stock-analyzer-project-po4e2s65z-dheerajs-dms-projects.vercel.app/",
    tags: ["Python", "FastAPI", "yfinance", "React", "Chart.js", "Tailwind CSS"],
    highlight: "Live Production Platform",
    noLive: false
  },
  {
    rank: 9,
    name: "Crypto Value Analyzer: Real-Time Quantitative Valuation Platform",
    domain: "Quantitative FinTech, Cryptocurrency & Real-Time Analytics",
    category: "Quant & FinTech",
    description: "Real-time cryptocurrency analytics system ranking digital assets via mathematical momentum and volatility decay models with FastAPI AsyncIO and sub-50ms WebSockets.",
    github: "https://github.com/DheerajS-DM/StableCoin-Risk-Analyzer",
    tags: ["Python", "FastAPI", "WebSockets", "Pandas", "React", "AsyncIO"],
    highlight: "Sub-50ms WebSocket Feed",
    noLive: true
  },
  {
    rank: 10,
    name: "DaVinci Resolve Multi-Agent Video Automation Orchestrator",
    domain: "Media Engineering, Agentic Automation & Video Pipelines",
    category: "Full-Stack & Cloud",
    description: "Asynchronous multi-agent pipeline driving Blackmagic DaVinci Resolve programmatically with FFmpeg waveform silence detection for fully automated timeline assembly.",
    github: "https://github.com/DheerajS-DM/davinci-video-automation-agent",
    tags: ["Python", "DaVinci Resolve API", "FFmpeg", "AsyncIO", "Multi-Agent"],
    highlight: "Headless NLE Automation",
    noLive: true
  },
  {
    rank: 11,
    name: "AI Agent Orchestration & Multi-Model Evaluation Studio",
    domain: "LLM Tooling, Full-Stack AI & Developer Observability",
    category: "AI & Formal Methods",
    description: "Interactive node-based canvas and asynchronous DAG execution studio for designing, debugging, and benchmarking multi-agent workflows with live token telemetry.",
    github: "https://github.com/DheerajS-DM/aiharnessporject",
    tags: ["Python", "FastAPI", "React 19", "HTML5 Canvas", "WebSockets", "DAG"],
    highlight: "Visual DAG Execution Canvas",
    noLive: true
  },
  {
    rank: 12,
    name: "GPU Hardware Telemetry & Real-Time NVML Profiler",
    domain: "Systems Engineering, GPU Profiling & Hardware Diagnostics",
    category: "Systems & HPC",
    description: "Lightweight hardware telemetry profiler querying NVIDIA's C-level NVML library directly with zero GUI lag, profiling PCIe link saturation, clocks, and power draw.",
    github: "https://github.com/DheerajS-DM/GPU_analyzer",
    tags: ["Python", "NVIDIA NVML", "Hardware Diagnostics", "Tkinter", "Multi-Threading"],
    highlight: "C-Level NVML Kernel Interface",
    noLive: true
  },
  {
    rank: 13,
    name: "CV Bridge Node & Edge Structural Weakness Analyzer",
    domain: "Computer Vision, Graph Theory & Structural Health Monitoring",
    category: "Vision & Simulation",
    description: "Computer vision pipeline extracting structural members via Hough transforms, clustering joints with DBSCAN, and flagging structural vulnerabilities using NetworkX betweenness centrality.",
    github: "https://github.com/DheerajS-DM/Node_and_Edge_detection-Bridge_Analysis",
    tags: ["Python", "OpenCV", "Scikit-Learn (DBSCAN)", "NetworkX", "Graph Theory"],
    highlight: "DBSCAN Topological Graphing",
    noLive: true
  },
  {
    rank: 14,
    name: "OrbitLens: SpaceTrack & EcoWatch Climate Platform",
    domain: "Aerospace Informatics, Earth Observation & Full-Stack Web",
    category: "Full-Stack & Cloud",
    description: "Aerospace informatics platform computing satellite orbital ground tracks via SGP4/Keplerian propagation and correlating them with live NASA EONET natural disaster telemetry.",
    github: "https://github.com/DheerajS-DM/Orbit-Lens",
    tags: ["React", "Node.js", "MongoDB", "Orbital Mechanics", "NASA EONET API"],
    highlight: "NASA EONET Satellite Correlation",
    noLive: true
  },
  {
    rank: 15,
    name: "ADITH-AI: Materials Informatics Platform",
    domain: "Materials Science, Web Scraping & Semantic Search",
    category: "Full-Stack & Cloud",
    description: "Materials informatics system with an automated Playwright crawler that extracts and normalizes MatWeb property datasheets into a Next.js multi-property comparison matrix.",
    github: "https://github.com/DheerajS-DM/ADITH-AI",
    tags: ["Next.js 14", "TypeScript", "Python", "Playwright", "Materials Informatics"],
    highlight: "Automated Data Normalization",
    noLive: true
  },
  {
    rank: 16,
    name: "Railway Operational Probability & Statistical Modeling Engine",
    domain: "Operations Research, Statistical Analysis & Transit Modeling",
    category: "Vision & Simulation",
    description: "Statistical transit modeling engine fitting empirical railway delay datasets against Weibull, Gamma, and Log-Normal probability distributions with Kolmogorov-Smirnov hypothesis testing.",
    github: "https://github.com/DheerajS-DM/IRCTC-Schedule-analyzer-inProgress-",
    tags: ["Python", "SciPy", "NumPy", "Statistical Modeling", "Matplotlib", "Tkinter"],
    highlight: "Non-Gaussian MLE Risk Fitting",
    noLive: true
  },
  {
    rank: 17,
    name: "GanttFlow: Interactive Timeline & Dependency Tracker",
    domain: "Project Management Systems, Enterprise Frontend & Scheduling",
    category: "Full-Stack & Cloud",
    description: "Interactive project timeline and task dependency management application built with Next.js 14, featuring custom SVG timeline rendering and multi-scale time horizon switching.",
    github: "https://github.com/DheerajS-DM/gantt-charts",
    tags: ["Next.js 14", "TypeScript", "React", "SVG Timeline Engine", "MongoDB"],
    highlight: "Custom SVG Vector Timeline",
    noLive: true
  },
  {
    rank: 18,
    name: "Interactive Developer Portfolio with Custom Playable Tetris Engine",
    domain: "Frontend Engineering, Game Dev & Creative Web Design",
    category: "Full-Stack & Cloud",
    description: "Personal developer portfolio featuring a zero-dependency 60 FPS HTML5 Canvas retro Tetris game engine with custom rotation matrices, wall kicks, and dark-mode aesthetics.",
    github: "https://github.com/DheerajS-DM/Portfoliowebsite",
    live: "#",
    tags: ["React 19", "HTML5 Canvas", "Tailwind CSS", "Vite", "Game Dev"],
    highlight: "Zero-Dependency 60 FPS Canvas Engine",
    noLive: false
  }
];

const categories = ["All", "Quant & FinTech", "Systems & HPC", "AI & Formal Methods", "Full-Stack & Cloud", "Vision & Simulation"];

export default function Portfolio() {
  const [isTetrisOpen, setIsTetrisOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        proj.name.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.domain.toLowerCase().includes(q) ||
        proj.tags.some(t => t.toLowerCase().includes(q))
      );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden font-sans relative bg-black text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Dynamic Constellation Background Canvas */}
      <ConstellationBackground />

      {/* Dimmed Ambient Glow Accents */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* MAIN CONTAINER */}
      <div 
        className={`absolute top-0 left-0 h-full overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 ${
          isTetrisOpen ? 'w-full lg:w-[68%]' : 'w-full'
        }`}
      >
        {/* STICKY TOP NAVBAR */}
        <header className="sticky top-0 z-40 w-full bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-6 sm:px-12 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
              <span className="w-8 h-8 rounded-lg bg-[#0e1320] border border-cyan-500/30 flex items-center justify-center font-mono font-black text-xs text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all">
                DS
              </span>
              <span className="font-mono text-xs font-bold text-slate-200 tracking-wider hidden sm:inline-block">
                Dheeraj Sutram
              </span>
            </a>
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-400">
                Full-Stack & Software Engineering
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6 text-xs font-mono">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer hidden md:inline-block"
            >
              // 01. Hero
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer hidden md:inline-block"
            >
              // 02. About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              // 03. Projects ({projects.length})
            </button>
            
            <button 
              onClick={() => setIsTetrisOpen(!isTetrisOpen)}
              className="relative px-3.5 py-1.5 rounded-md text-xs font-mono font-bold bg-[#0c101a] border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.12)] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center gap-2 cursor-pointer"
            >
              <span>{isTetrisOpen ? "Close Arcade" : "Tetris Arcade"}</span>
              <span className={`w-2 h-2 rounded-full ${isTetrisOpen ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`} />
            </button>
          </nav>
        </header>

        <div className="px-6 sm:px-12 lg:px-16 pt-8 pb-20 max-w-7xl mx-auto space-y-16">

          {/* HERO SECTION */}
          <section id="hero" className="pt-6 sm:pt-12 pb-6 flex flex-col items-start relative z-10">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#0a0e17] border border-cyan-500/25 text-cyan-400/90 text-[11px] font-mono mb-6 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="tracking-wide">SYS_STATUS: ONLINE // FULL-STACK & SOFTWARE ENGINEER</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-slate-100 block">Building Scalable Web Apps,</span>
              <span className="bg-gradient-to-r from-slate-100 via-cyan-300/90 to-indigo-300 bg-clip-text text-transparent block">
                Full-Stack Systems & AI Tools
              </span>
            </h1>

            {/* Subheadline / Intro Text */}
            <p className="max-w-3xl text-sm sm:text-base text-slate-400 leading-relaxed font-normal mb-8">
              Software engineer passionate about building high-performance web applications, intelligent automation, cloud services, and developer tooling. Experienced across frontend engineering, backend services, AI integrations, and interactive software.
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-4xl mb-10">
              <div className="bg-[#090d16]/80 border border-white/[0.07] p-4 rounded-xl backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black font-mono text-cyan-400">18</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Production Projects</div>
              </div>

              <div className="bg-[#090d16]/80 border border-white/[0.07] p-4 rounded-xl backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">Full-Stack</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Web, Cloud & AI</div>
              </div>

              <div className="bg-[#090d16]/80 border border-white/[0.07] p-4 rounded-xl backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black font-mono text-amber-300">Patent</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">R-IPR0003006P (UCSD)</div>
              </div>

              <div className="bg-[#090d16]/80 border border-white/[0.07] p-4 rounded-xl backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black font-mono text-indigo-300">VIT '28</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Information Tech</div>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 rounded-lg text-xs font-mono font-bold bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <span className="text-sm">↓</span>
              </button>

              <button
                onClick={() => setIsTetrisOpen(true)}
                className="px-6 py-3 rounded-lg text-xs font-mono font-bold bg-[#0a0d16] hover:bg-[#111624] border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Play Tetris Arcade</span>
                <span className="text-sm">🎮</span>
              </button>

              <a
                href="https://github.com/DheerajS-DM"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-lg text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <span>GitHub Profile</span>
                <span>↗</span>
              </a>
            </div>
          </section>

          {/* BIO SECTION (TERMINAL STYLE - DIMMED PITCH BLACK) */}
          <section id="about" className="relative z-10 pt-4">
            <div className="bg-[#06080e]/90 border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              {/* Window Bar */}
              <div className="bg-[#030408] px-4 py-2.5 flex items-center justify-between border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="text-[11px] font-mono text-cyan-400/90 tracking-wider ml-2 font-bold">dheeraj_engineer.sh</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">v3.2 // Software Engineer Profile</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed space-y-4">
                <div className="flex items-start gap-2 text-emerald-400/90">
                  <span className="text-cyan-400">➜</span>
                  <span className="text-slate-500">~</span>
                  <span className="text-slate-200">
                    Software Engineer building full-stack web applications, intelligent AI pipelines, scalable cloud services, and high-performance software.
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 text-xs border-t border-white/[0.06] pt-4 text-slate-300">
                  <div>
                    <span className="text-cyan-400 font-bold block mb-0.5">EDUCATION & AFFILIATION</span>
                    <span className="text-slate-400">BE Information Tech @ VIT (2024 - 2028)</span>
                  </div>
                  <div>
                    <span className="text-indigo-400 font-bold block mb-0.5">CORE SPECS</span>
                    <span className="text-slate-400">React, Next.js, Node, Python, Rust, C/C++</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold block mb-0.5">CONTACT & LINKS</span>
                    <span className="text-slate-400 block">dheeraj22may@gmail.com</span>
                    <span className="text-slate-400 block">+91 9360229114</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEARCH & CATEGORY FILTER SECTION */}
          <section id="projects" className="relative z-10 space-y-5 pt-4">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[#06080e]/80 border border-white/[0.07] p-4 rounded-xl backdrop-blur-xl">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                        : 'bg-black/40 text-slate-400 border border-white/[0.06] hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                    {cat === "All" && ` (${projects.length})`}
                  </button>
                ))}
              </div>

              {/* Live Search Bar */}
              <div className="relative min-w-[240px] max-w-sm">
                <input
                  type="text"
                  placeholder="Filter by keyword, tech, domain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 focus:border-cyan-500/60 rounded-lg px-3.5 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1.5 text-slate-500 hover:text-slate-300 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">//</span> Ranked Engineering Catalog: Complexity Order
              </span>
              <span>
                Showing {filteredProjects.length} of {projects.length} Systems
              </span>
            </div>

            {/* PROJECTS GRID (PITCH BLACK DARK GLASS CARDS) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
              {filteredProjects.map((proj) => {
                const isTop3 = proj.rank <= 3;
                return (
                  <div 
                    key={proj.rank} 
                    className="group bg-[#07090f]/70 hover:bg-[#0b0f19]/90 p-6 rounded-xl border border-white/[0.07] hover:border-cyan-500/35 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_10px_35px_rgba(6,182,212,0.12)] relative overflow-hidden backdrop-blur-md"
                  >
                    {/* Rank Accent Line */}
                    <div 
                      className={`absolute top-0 left-0 w-1 h-full ${
                        isTop3 
                          ? 'bg-gradient-to-b from-amber-400/90 via-cyan-400/80 to-indigo-400/70 shadow-[0_0_8px_rgba(251,191,36,0.3)]' 
                          : 'bg-gradient-to-b from-cyan-500/50 via-indigo-500/30 to-slate-700/30 opacity-60 group-hover:opacity-100'
                      } transition-opacity`} 
                    />

                    <div className="pl-2">
                      {/* Rank Badge & Domain Header */}
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded ${
                            isTop3
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                              : 'bg-black/60 text-cyan-400/90 border border-cyan-500/20'
                          }`}>
                            RANK #{proj.rank < 10 ? `0${proj.rank}` : proj.rank}
                          </span>
                          {proj.highlight && (
                            <span className="text-[10px] font-mono font-medium text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                              {proj.highlight}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]">
                          {proj.category}
                        </span>
                      </div>

                      {/* Title & Domain */}
                      <h2 className="text-base sm:text-lg font-bold mb-1 text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                        {proj.name}
                      </h2>
                      <p className="text-[11px] font-mono text-cyan-500/80 mb-3 font-semibold">
                        {proj.domain}
                      </p>

                      {/* Description */}
                      <p className="text-slate-300/90 text-xs leading-relaxed mb-4 font-normal">
                        {proj.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="text-[10px] font-mono text-slate-300 bg-black/50 border border-white/[0.08] px-2 py-0.5 rounded tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions & Links */}
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3.5 mt-3 text-xs font-mono pl-2">
                      <div className="flex items-center gap-4">
                        <a 
                          href={proj.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-cyan-400/90 hover:text-cyan-300 font-bold transition-colors inline-flex items-center gap-1"
                        >
                          Source Code ↗
                        </a>
                        {proj.live && proj.live !== "#" && (
                          <a 
                            href={proj.live} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-emerald-400/90 hover:text-emerald-300 font-bold transition-colors inline-flex items-center gap-1"
                          >
                            Live Platform ↗
                          </a>
                        )}
                      </div>
                      
                      {proj.noLive ? (
                        <span className="text-slate-500 text-[10px] font-medium hidden sm:inline-block">
                          // Systems Engine
                        </span>
                      ) : (
                        <span className="text-emerald-400/80 text-[10px] font-medium hidden sm:inline-block">
                          ● Deployed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-white/[0.06] pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div>
              © {new Date().getFullYear()} Dheeraj Sutram. Pitch-Black Constellation Theme.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/DheerajS-DM" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                GitHub
              </a>
              <span>•</span>
              <a href="mailto:dheeraj22may@gmail.com" className="hover:text-cyan-400 transition-colors">
                Email
              </a>
            </div>
          </footer>
        </div>
      </div>

      {/* TETRIS SIDEBAR DRAWER (PITCH BLACK THEME) */}
      <div 
        className={`
          absolute top-0 right-0 h-full bg-black/95 backdrop-blur-2xl z-50
          transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col overflow-hidden
          w-[85%] sm:w-[450px] lg:w-[32%] border-l border-white/10
          ${isTetrisOpen ? 'translate-x-0 shadow-[-50px_0_100px_rgba(0,0,0,0.9)]' : 'translate-x-full'}
        `}
      >
        <Tetris />
      </div>

      {/* MOBILE OVERLAY */}
      {isTetrisOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-700"
          onClick={() => setIsTetrisOpen(false)}
        />
      )}
    </div>
  );
}