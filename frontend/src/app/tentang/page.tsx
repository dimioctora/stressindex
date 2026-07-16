import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, Heart, Shield, Users, Target, Building2, CheckCircle2 } from "lucide-react";
import TrialTestMenu from "@/components/TrialTestMenu";

export default function TentangPage() {
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
            <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">Beranda</Link>
            <Link href="/tentang" className="text-slate-900 font-semibold hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600">Tentang</Link>
            <Link href="/fitur" className="text-slate-500 hover:text-slate-900 transition-colors">Fitur</Link>
            <Link href="/manfaat" className="text-slate-500 hover:text-slate-900 transition-colors">Manfaat</Link>
            <Link href="/kontak" className="text-slate-500 hover:text-slate-900 transition-colors">Kontak</Link>
          </nav>
          <div className="flex items-center gap-3">
            <TrialTestMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 relative pt-16">
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 md:px-8 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wide w-fit mb-6 shadow-sm">
               <Heart className="h-3 w-3" />
               TENTANG KAMI
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-6">
              Membangun Budaya Kerja yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Sehat & Produktif</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
              Stress Index hadir untuk memberikan wawasan mendalam mengenai kesehatan mental dan tingkat stres di lingkungan kerja Anda, berbasis data yang akurat dan pendekatan ilmiah.
            </p>
          </div>
        </section>

        {/* FUNGSI PLATFORM SECTION */}
        <section className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                {/* Abstract decorative shapes */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[3rem] -z-10 rotate-3"></div>
                
                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                      <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Fungsi Utama</h3>
                  </div>
                  
                  <ul className="space-y-5">
                    {[
                      "Pengukuran stres karyawan secara real-time dan akurat",
                      "Analisis data komprehensif dari tingkat individu hingga perusahaan",
                      "Deteksi dini potensi burnout dan penurunan produktivitas",
                      "Rekomendasi tindakan preventif berdasarkan hasil asesmen"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">Platform Asesmen Psikologis Modern</h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  Kami memahami bahwa aset berharga sebuah perusahaan adalah manusianya. Stress Index tidak hanya sekadar mengukur, melainkan membantu manajemen perusahaan untuk <strong>mendengar dan memahami</strong> kondisi mental tim mereka.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Dengan antarmuka yang intuitif dan kuesioner terstandarisasi, kami menghilangkan kerumitan survei tradisional dan mengubah data mentah menjadi <span className="font-semibold text-slate-800">insight yang siap ditindaklanjuti (actionable insights)</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ROE INDONESIA SECTION */}
        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <Building2 className="w-12 h-12 text-indigo-600 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Bagian dari ROE Indonesia</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stress Index dengan bangga dikembangkan dan dikelola di bawah naungan <strong>ROE Indonesia</strong> (Rhythm Of Empowerment). Kami mengintegrasikan teknologi dan psikologi industri untuk menciptakan ekosistem kerja yang lebih baik.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">Visi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600 leading-relaxed">
                  Menjadi mitra strategis terpercaya bagi perusahaan dalam mentransformasi pengalaman dan kesejahteraan karyawan melalui inovasi digital yang berkelanjutan.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">Integritas Ilmiah</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600 leading-relaxed">
                  Semua instrumen dan metodologi pengukuran yang kami gunakan telah divalidasi oleh para ahli psikologi industri dari ROE Indonesia untuk menjamin akurasi data.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">Fokus Pada Manusia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600 leading-relaxed">
                  Kami percaya bahwa perusahaan yang sehat dimulai dari individu yang sehat. Fokus utama kami adalah meningkatkan kualitas hidup pekerja di Indonesia.
                </CardDescription>
              </CardContent>
            </Card>
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
          <div className="text-sm flex flex-col md:items-end items-center gap-1">
            <span>© 2026 Stress Index. All rights reserved.</span>
            <span className="text-slate-500 text-xs">Part of ROE Indonesia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
