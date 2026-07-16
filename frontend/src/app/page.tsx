import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, ClipboardList, Zap, BarChart3, ShieldCheck, Download, QrCode } from "lucide-react";
import HeroGraphic from "@/components/HeroGraphic";
import TrialTestMenu from "@/components/TrialTestMenu";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-hidden">
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-indigo-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-indigo-950/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2.5">
            <img src="/images/roe-icon.png" alt="StressIndex Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-extrabold tracking-tight text-white leading-none">STRESS<span className="text-blue-400">INDEX</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-white font-semibold relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-blue-400">Beranda</Link>
            <Link href="/tentang" className="text-indigo-200 hover:text-white transition-colors">Tentang</Link>
            <Link href="/fitur" className="text-indigo-200 hover:text-white transition-colors">Fitur</Link>
            <Link href="/manfaat" className="text-indigo-200 hover:text-white transition-colors">Manfaat</Link>
            <Link href="/kontak" className="text-indigo-200 hover:text-white transition-colors">Kontak</Link>
          </nav>
          <div className="flex items-center gap-3">
            <TrialTestMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* HERO SECTION WITH CURVED BACKGROUND */}
        <div className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 pb-20 pt-28 md:pt-40 md:pb-32 overflow-hidden">
          {/* Dynamic Premium Background Shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10"></div>
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-[120px] pointer-events-none"></div>
          <div className="absolute top-32 left-0 -translate-x-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 blur-[120px] pointer-events-none"></div>
          
          <section className="container mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-14 items-center">
            <div className="flex flex-col gap-6 md:pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold tracking-wide w-fit mb-2 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                PLATFORM PENILAIAN PSIKOLOGIS V2.0
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Ukur. Pahami.<br />
                Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Kesejahteraan</span> Anda.
              </h1>
              <p className="text-lg text-indigo-100 max-w-[500px] leading-relaxed font-medium">
                Stress Index adalah platform digital kelas *enterprise* untuk mengukur dan menganalisis tingkat stres karyawan secara ilmiah, *real-time*, dan akurat.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <Link href="/demo"><Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-blue-900/50 bg-white text-blue-700 hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200">Mulai Survei</Button></Link>
                <Link href="/demo"><Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2 rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all">
                  <Play className="h-4 w-4 text-blue-300" fill="currentColor" /> Lihat Demo
                </Button></Link>
              </div>
            </div>
            <HeroGraphic />
          </section>

          {/* Curved Edge SVG */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
            <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="relative block w-full h-[100px] md:h-[220px]">
              <path fill="rgba(255,255,255,0.15)" d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <path fill="rgba(255,255,255,0.3)" d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,197.3C672,224,768,256,864,250.7C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <path fill="#ffffff" d="M0,256L48,245.3C96,235,192,213,288,218.7C384,224,480,256,576,261.3C672,267,768,245,864,224C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>

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
              {/* Logo Bank Indonesia */}
              <div className="relative h-12 w-48 transition-all hover:scale-105">
                <Image src="/logos/bi.png" alt="Bank Indonesia" fill className="object-contain" />
              </div>
              {/* Logo Mandiri */}
              <div className="relative h-10 w-32 transition-all hover:scale-105">
                <Image src="/logos/mandiri.png" alt="Bank Mandiri" fill className="object-contain" />
              </div>
              {/* Logo BCA */}
              <div className="relative h-12 w-32 transition-all hover:scale-105">
                <Image src="/logos/bca.png" alt="BCA" fill className="object-contain" />
              </div>
              {/* Logo Pertamina */}
              <div className="relative h-10 w-40 transition-all hover:scale-105">
                <Image src="/logos/pertamina.png" alt="Pertamina" fill className="object-contain" />
              </div>
              {/* Logo Telkom */}
              <div className="relative h-14 w-32 transition-all hover:scale-105">
                <Image src="/logos/telkom.png" alt="Telkom Indonesia" fill className="object-contain" />
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
            © 2026 ROE Indonesia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
