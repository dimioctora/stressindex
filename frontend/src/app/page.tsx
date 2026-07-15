import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, ClipboardList, Zap, BarChart3, ShieldCheck, Download, QrCode } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-hidden">
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-lg shadow-sm shadow-blue-500/20">
               <BarChart3 className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">STRESS<span className="text-blue-600">INDEX</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-slate-900 font-semibold hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600">Beranda</Link>
            <Link href="/tentang" className="text-slate-500 hover:text-slate-900 transition-colors">Tentang</Link>
            <Link href="/fitur" className="text-slate-500 hover:text-slate-900 transition-colors">Fitur</Link>
            <Link href="/manfaat" className="text-slate-500 hover:text-slate-900 transition-colors">Manfaat</Link>
            <Link href="/kontak" className="text-slate-500 hover:text-slate-900 transition-colors">Kontak</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex rounded-full px-5 text-slate-600 hover:text-slate-900 font-medium">Masuk</Button>
            <Link href="/demo"><Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 font-medium transition-all">Coba Demo</Button></Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative pt-16">
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 md:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col gap-6 md:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide w-fit mb-2 shadow-sm">
               <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
               PLATFORM PENILAIAN PSIKOLOGIS V2.0
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Ukur. Pahami.<br />
              Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Kesejahteraan</span> Anda.
            </h1>
            <p className="text-lg text-slate-500 max-w-[500px] leading-relaxed font-medium">
              Stress Index adalah platform digital kelas *enterprise* untuk mengukur dan menganalisis tingkat stres karyawan secara ilmiah, *real-time*, dan akurat.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Link href="/demo"><Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-blue-500/25 bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200">Mulai Survei</Button></Link>
              <Link href="/demo"><Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                <Play className="h-4 w-4 text-blue-600" fill="currentColor" /> Lihat Demo
              </Button></Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full">
            {/* Abstract Background Shape */}
            <div className="absolute inset-0 right-[-10%] bg-[#f0f4ff] rounded-[3rem] -z-10 rotate-3"></div>
            
            {/* Dashboard Mockup - Futuristic Dark Mode */}
            <div className="absolute right-0 top-4 w-[90%] h-[80%] bg-[#0B1121] rounded-2xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] border border-slate-800/80 flex flex-col overflow-hidden backdrop-blur-xl">
                <div className="h-10 border-b border-slate-800/80 flex items-center px-4 justify-between bg-[#0F172A]/80">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    </div>
                    <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-blue-500/50 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="flex-1 p-6 flex gap-6 relative">
                    {/* Grid Background Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
                    
                    <div className="w-5/12 flex flex-col justify-center items-center gap-4 bg-slate-900/50 rounded-xl border border-slate-800/50 p-4 z-10 backdrop-blur-sm">
                         {/* Donut Chart Futuristic */}
                         <div className="relative w-32 h-32">
                             <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" viewBox="0 0 100 100">
                                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="12" />
                                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f43f5e" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="125.6" strokeLinecap="round" />
                                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="188.4" strokeLinecap="round" />
                             </svg>
                             <div className="absolute inset-0 flex items-center justify-center flex-col">
                                 <span className="text-2xl font-extrabold text-white tracking-tight">68.7</span>
                                 <span className="text-[10px] text-blue-400 font-semibold tracking-widest uppercase">Score</span>
                             </div>
                         </div>
                    </div>
                    <div className="w-7/12 bg-slate-900/50 rounded-xl border border-slate-800/50 flex items-center justify-center p-4 z-10 backdrop-blur-sm">
                        {/* Radar Chart Futuristic */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                <defs>
                                   <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
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
                                
                                {/* Background Hexagons */}
                                <polygon points="50,10 90,40 75,90 25,90 10,40" fill="transparent" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                                <polygon points="50,25 75,45 65,75 35,75 25,45" fill="transparent" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                                <polygon points="50,40 60,50 55,60 45,60 40,50" fill="transparent" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                                
                                {/* Axis Lines */}
                                <line x1="50" y1="50" x2="50" y2="10" stroke="#334155" strokeWidth="1" />
                                <line x1="50" y1="50" x2="90" y2="40" stroke="#334155" strokeWidth="1" />
                                <line x1="50" y1="50" x2="75" y2="90" stroke="#334155" strokeWidth="1" />
                                <line x1="50" y1="50" x2="25" y2="90" stroke="#334155" strokeWidth="1" />
                                <line x1="50" y1="50" x2="10" y2="40" stroke="#334155" strokeWidth="1" />
                                
                                {/* Data Polygon */}
                                <polygon points="50,30 80,45 60,80 30,75 15,50" fill="url(#radarGlow)" stroke="#60a5fa" strokeWidth="2" filter="url(#glow)" />
                                
                                {/* Nodes */}
                                <circle cx="50" cy="30" r="2.5" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                                <circle cx="80" cy="45" r="2.5" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                                <circle cx="60" cy="80" r="2.5" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                                <circle cx="30" cy="75" r="2.5" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                                <circle cx="15" cy="50" r="2.5" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow)" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile App Mockup - Futuristic */}
            <div className="absolute right-4 bottom-[-5%] md:bottom-[-10%] w-[150px] md:w-[170px] h-[320px] bg-[#0F172A]/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[6px] border-slate-800 flex flex-col items-center py-6 px-4 z-20">
                <div className="w-12 h-1.5 bg-slate-800 rounded-full mb-4 absolute top-2.5"></div>
                
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
                        <path d="M 10 50 A 40 40 0 0 1 70 20" fill="transparent" stroke="url(#gaugeGrad)" strokeWidth="8" strokeLinecap="round" filter="url(#gaugeGlow)" />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center">
                        <div className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">68.7</div>
                        <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mt-1 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">Sedang</div>
                    </div>
                </div>
                
                <div className="w-full space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden"><div className="w-[70%] h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_5px_#a855f7]"></div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden"><div className="w-[40%] h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div></div>
                    </div>
                </div>
            </div>

            {/* Float Stat Card Top */}
            <div className="absolute left-[5%] top-[-5%] bg-white p-3 md:p-4 rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 z-10 hidden sm:block">
                <div className="text-[10px] md:text-xs text-slate-500 font-medium mb-1">Rata-rata Stress</div>
                <div className="flex items-end gap-3">
                    <div>
                        <span className="text-xl md:text-2xl font-bold text-slate-800">68.7</span>
                        <div className="text-[10px] font-medium text-amber-500">Sedang</div>
                    </div>
                    <svg className="w-8 h-6 text-amber-500 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                </div>
            </div>

            {/* Float Stat Card Bottom */}
            <div className="absolute left-0 md:left-[-10%] bottom-8 bg-white p-3 md:p-4 rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 z-10">
                <div className="text-[10px] md:text-xs text-slate-500 font-medium mb-1">Tingkat Partisipasi</div>
                <div className="flex items-center gap-4">
                    <span className="text-xl md:text-2xl font-bold text-slate-800">78.5%</span>
                    <svg className="w-8 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Fitur Unggulan</h2>
          <p className="text-slate-600 mb-16 text-lg max-w-2xl mx-auto">Semua yang Anda butuhkan untuk survei stres yang efektif dan bermakna.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
            {[
              { icon: ClipboardList, color: "text-purple-600", bg: "bg-purple-100", title: "Kuesioner Terstandar", desc: "Instrumen valid seperti SDS dengan skala 1-7 yang mudah digunakan." },
              { icon: Zap, color: "text-emerald-600", bg: "bg-emerald-100", title: "Skoring Otomatis", desc: "Perhitungan skor per dimensi dan total secara instan dan akurat." },
              { icon: BarChart3, color: "text-amber-600", bg: "bg-amber-100", title: "Analisis Mendalam", desc: "Dashboard interaktif untuk analisis individu, divisi, hingga perusahaan." },
              { icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-100", title: "Aman & Terpercaya", desc: "Data terlindungi dengan standar keamanan tinggi dan privasi terjamin." },
              { icon: Download, color: "text-rose-600", bg: "bg-rose-100", title: "Laporan Fleksibel", desc: "Ekspor laporan dalam PDF, Excel, dan CSV sesuai kebutuhan Anda." },
            ].map((feature, i) => (
              <Card key={i} className="border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all bg-white rounded-2xl group cursor-default">
                <CardHeader className="pb-3">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-800 leading-tight">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-slate-600">{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* LOGOS SECTION */}
        <section className="border-y border-slate-100 bg-slate-50/50 py-10 mt-10 mb-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">Dipercaya oleh organisasi yang peduli pada manusia</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Logo Bank Indonesia Mock */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-serif font-bold text-xl">B</div> 
                <div className="text-left leading-none"><div className="font-bold text-blue-900 text-sm">BANK INDONESIA</div><div className="text-[8px] tracking-widest">BANK SENTRAL REPUBLIK INDONESIA</div></div>
              </div>
              {/* Logo Mandiri Mock */}
              <div className="text-2xl font-bold text-blue-800 tracking-tighter">mandiri</div>
              {/* Logo BCA Mock */}
              <div className="text-3xl font-extrabold italic text-blue-900 tracking-tighter">BCA</div>
              {/* Logo Pertamina Mock */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rotate-45 bg-blue-600 rounded-sm"></div> 
                <div className="text-xl font-bold text-red-600 tracking-wide">PERTAMINA</div>
              </div>
              {/* Logo Telkom Mock */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600"></div> 
                <div className="text-lg font-bold text-slate-800 leading-tight">Telkom<br/>Indonesia</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="container mx-auto px-4 pb-24">
          <div className="bg-[#f0f4ff] rounded-[2.5rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            
            <div className="md:w-1/3 flex justify-center z-10 relative">
              {/* Illustration Placeholder (Vector-like CSS) */}
              <div className="w-56 h-56 relative flex items-end justify-center">
                 {/* Plant leaves background */}
                 <div className="absolute left-0 bottom-4 w-12 h-24 bg-[#cbd5e1] rounded-full origin-bottom rotate-[-20deg] opacity-60"></div>
                 <div className="absolute left-6 bottom-4 w-10 h-20 bg-[#94a3b8] rounded-full origin-bottom rotate-[-45deg] opacity-60"></div>
                 
                 {/* Person */}
                 <div className="w-32 h-40 bg-blue-600 rounded-t-3xl relative z-10 flex flex-col items-center pt-2">
                     <div className="w-16 h-20 bg-[#fcd34d] rounded-2xl -mt-16 relative">
                         {/* Hair */}
                         <div className="absolute -top-2 -left-1 -right-1 h-8 bg-slate-900 rounded-t-2xl rounded-bl-xl"></div>
                         {/* Face */}
                         <div className="absolute top-8 right-3 w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                         <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                         <div className="absolute top-12 right-4 w-4 h-1.5 rounded-full bg-amber-600/50"></div>
                     </div>
                 </div>
                 
                 {/* Laptop */}
                 <div className="absolute bottom-0 right-0 w-32 h-20 bg-slate-800 rounded-t-xl rounded-bl-xl z-20 flex items-center justify-center">
                     <div className="w-3 h-3 rounded-full bg-white/20"></div>
                 </div>
              </div>
            </div>
            
            <div className="md:w-1/3 z-10 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 leading-tight">Siap memahami tingkat stres di organisasi Anda?</h2>
              <p className="text-slate-600 mb-8 text-sm md:text-base">
                Mulai survei sekarang dan dapatkan insight berharga untuk menciptakan lingkungan kerja yang lebih sehat dan produktif.
              </p>
              <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700">Mulai Sekarang</Button>
            </div>
            
            <div className="md:w-1/3 flex justify-center md:justify-end z-10">
               <div className="bg-white p-4 rounded-2xl flex items-center gap-5 shadow-lg border border-slate-100">
                  <QrCode className="w-20 h-20 text-slate-800" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-slate-600 max-w-[100px] leading-relaxed">Scan QR Code untuk mencoba demo survei</span>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0f172a] text-slate-400 py-10 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-bold tracking-tight text-lg">STRESS INDEX</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <Link href="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link>
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-white transition-colors">Bantuan</Link>
          </div>
          <div className="text-sm">
            © 2026 Stress Index. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
