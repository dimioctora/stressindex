"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroGraphic() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="relative h-[400px] md:h-[500px] w-full opacity-0"></div>;
  }

  // Float animation variants
  const floatVariant1 = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatVariant2 = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      },
    },
  };

  const pulseRingVariant = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className="relative h-[400px] md:h-[500px] w-full perspective-1000">
      {/* Abstract Background Shape */}
      <motion.div 
        animate={{ 
          rotate: [3, 0, 3],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 right-[-10%] bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] rounded-[3rem] -z-10"
      />
      
      {/* Dashboard Mockup - Futuristic Dark Mode */}
      <motion.div 
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2, zIndex: 30 }}
        className="absolute right-0 top-4 w-[90%] h-[80%] bg-[#0B1121] rounded-2xl shadow-[0_20px_50px_-12px_rgba(59,130,246,0.3)] border border-slate-800/80 flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 transform-gpu cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
          <div className="h-10 border-b border-slate-800/80 flex items-center px-4 justify-between bg-[#0F172A]/80">
              <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
              </div>
              <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: ["0%", "40%", "100%", "30%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full bg-blue-500/80 rounded-full"
                  />
              </div>
          </div>
          <div className="flex-1 p-6 flex gap-6 relative">
              {/* Grid Background Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
              
              <div className="w-5/12 flex flex-col justify-center items-center gap-4 bg-slate-900/50 rounded-xl border border-slate-800/50 p-4 z-10 backdrop-blur-sm relative group overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                   {/* Donut Chart Futuristic */}
                   <div className="relative w-32 h-32">
                       <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" viewBox="0 0 100 100">
                           <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="12" />
                           <motion.circle 
                              initial={{ strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 62.8 }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                              cx="50" cy="50" r="40" fill="transparent" stroke="#f43f5e" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round" 
                           />
                           <motion.circle 
                              initial={{ strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 125.6 }}
                              transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                              cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round" 
                           />
                           <motion.circle 
                              initial={{ strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 188.4 }}
                              transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
                              cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round" 
                           />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center flex-col">
                           <motion.span 
                             initial={{ opacity: 0, scale: 0.5 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 1.5 }}
                             className="text-2xl font-extrabold text-white tracking-tight"
                           >
                             68.7
                           </motion.span>
                           <span className="text-[10px] text-blue-400 font-semibold tracking-widest uppercase">Score</span>
                       </div>
                   </div>
              </div>
              <div className="w-7/12 bg-slate-900/50 rounded-xl border border-slate-800/50 flex items-center justify-center p-4 z-10 backdrop-blur-sm group hover:border-blue-500/30 transition-colors">
                  {/* Radar Chart Futuristic */}
                  <div className="relative w-full h-full flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                          <defs>
                             <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                             </radialGradient>
                             <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                   <feMergeNode in="coloredBlur"/>
                                   <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                             </filter>
                          </defs>
                          
                          {/* Background Hexagons with pulse */}
                          <motion.polygon 
                            variants={pulseRingVariant} animate="animate"
                            points="50,10 90,40 75,90 25,90 10,40" fill="transparent" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" 
                          />
                          <polygon points="50,25 75,45 65,75 35,75 25,45" fill="transparent" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                          <polygon points="50,40 60,50 55,60 45,60 40,50" fill="transparent" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                          
                          {/* Axis Lines */}
                          <line x1="50" y1="50" x2="50" y2="10" stroke="#334155" strokeWidth="1" />
                          <line x1="50" y1="50" x2="90" y2="40" stroke="#334155" strokeWidth="1" />
                          <line x1="50" y1="50" x2="75" y2="90" stroke="#334155" strokeWidth="1" />
                          <line x1="50" y1="50" x2="25" y2="90" stroke="#334155" strokeWidth="1" />
                          <line x1="50" y1="50" x2="10" y2="40" stroke="#334155" strokeWidth="1" />
                          
                          {/* Data Polygon */}
                          <motion.polygon 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5, type: "spring" }}
                            points="50,30 80,45 60,80 30,75 15,50" fill="url(#radarGlow)" stroke="#60a5fa" strokeWidth="2" filter="url(#glow)" style={{ transformOrigin: '50px 50px' }}
                          />
                          
                          {/* Nodes with pulse */}
                          <motion.circle animate={{ r: [2.5, 4, 2.5] }} transition={{ duration: 2, repeat: Infinity }} cx="50" cy="30" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                          <motion.circle animate={{ r: [2.5, 4, 2.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} cx="80" cy="45" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                          <motion.circle animate={{ r: [2.5, 4, 2.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }} cx="60" cy="80" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                          <motion.circle animate={{ r: [2.5, 4, 2.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} cx="30" cy="75" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                          <motion.circle animate={{ r: [2.5, 4, 2.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1.6 }} cx="15" cy="50" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                      </svg>
                  </div>
              </div>
          </div>
      </motion.div>

      {/* Mobile App Mockup - Futuristic */}
      <motion.div 
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        whileHover={{ y: -15, scale: 1.05, rotate: -2, zIndex: 40 }}
        className="absolute right-4 bottom-[-5%] md:bottom-[-10%] w-[150px] md:w-[170px] h-[320px] bg-[#0F172A]/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border-[4px] border-slate-700/50 flex flex-col items-center py-6 px-4 z-20 cursor-pointer transition-all duration-300"
      >
          <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mb-4 absolute top-3"></div>
          
          <span className="text-[9px] font-extrabold text-slate-400 tracking-[0.2em] mb-8 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">STRESS INDEX</span>
          
          {/* Futuristic Gauge */}
          <div className="relative w-28 h-28 mb-8">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                  <defs>
                      <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                      <filter id="gaugeGlow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                             <feMergeNode in="coloredBlur"/>
                             <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                      </filter>
                  </defs>
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="transparent" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.7 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    d="M 10 50 A 40 40 0 0 1 90 50" fill="transparent" stroke="url(#gaugeGrad)" strokeWidth="8" strokeLinecap="round" filter="url(#gaugeGlow)" 
                  />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    68.7
                  </motion.div>
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mt-1 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">Sedang</div>
              </div>
          </div>
          
          <div className="w-full space-y-4">
              <div className="flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></motion.div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ delay: 1.2, duration: 1 }} className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></motion.div>
                  </div>
              </div>
              <div className="flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_5px_#a855f7]"></motion.div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ delay: 1.4, duration: 1 }} className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></motion.div>
                  </div>
              </div>
              <div className="flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></motion.div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ delay: 1.6, duration: 1 }} className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></motion.div>
                  </div>
              </div>
          </div>
      </motion.div>

      {/* Float Stat Card Top */}
      <motion.div 
        variants={floatVariant1}
        initial="initial"
        animate="animate"
        className="absolute left-[5%] top-[-5%] z-30 hidden sm:block"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl shadow-blue-500/10 border border-white/50 cursor-pointer"
        >
          <div className="text-[10px] md:text-xs text-slate-500 font-medium mb-1">Rata-rata Stress</div>
          <div className="flex items-end gap-3">
              <div>
                  <span className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">68.7</span>
                  <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Sedang</div>
              </div>
              <svg className="w-8 h-6 text-amber-500 mb-1 drop-shadow-[0_2px_4px_rgba(245,158,11,0.2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Float Stat Card Bottom */}
      <motion.div 
        variants={floatVariant2}
        initial="initial"
        animate="animate"
        className="absolute left-0 md:left-[-10%] bottom-8 z-30"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl shadow-blue-500/10 border border-white/50 cursor-pointer"
        >
          <div className="text-[10px] md:text-xs text-slate-500 font-medium mb-1">Tingkat Partisipasi</div>
          <div className="flex items-center gap-4">
              <span className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">78.5%</span>
              <motion.svg animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }} className="w-8 h-6 text-emerald-500 drop-shadow-[0_2px_4px_rgba(16,185,129,0.2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></motion.svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
