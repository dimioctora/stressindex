import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, HeartHandshake, Lightbulb, Users2, ShieldCheck, Sparkles, Building } from "lucide-react";

export default function ManfaatPage() {
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
            <Link href="/tentang" className="text-slate-500 hover:text-slate-900 transition-colors">Tentang</Link>
            <Link href="/fitur" className="text-slate-500 hover:text-slate-900 transition-colors">Fitur</Link>
            <Link href="/manfaat" className="text-slate-900 font-semibold hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600">Manfaat</Link>
            <Link href="/kontak" className="text-slate-500 hover:text-slate-900 transition-colors">Kontak</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex rounded-full px-5 text-slate-600 hover:text-slate-900 font-medium">Masuk</Button>
            <Link href="/demo"><Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 font-medium transition-all">Coba Demo</Button></Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative pt-16">
        {/* Subtle Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 md:px-8 py-20 md:py-28 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold tracking-wide w-fit mb-6">
             <Sparkles className="h-3 w-3" />
             VALUE PROPOSITION
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
            Investasi Terbaik untuk <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Masa Depan Perusahaan</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Temukan bagaimana Stress Index memberikan dampak nyata, tidak hanya untuk kesejahteraan karyawan, tetapi juga untuk pertumbuhan bisnis secara keseluruhan.
          </p>
        </section>

        {/* MANFAAT UNTUK PERUSAHAAN */}
        <section className="py-20 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
             <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <Building className="w-5 h-5" />
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900">Bagi Perusahaan</h2>
                  </div>
                  <p className="text-slate-600 text-lg max-w-xl">Meningkatkan efisiensi dan mempertahankan talenta terbaik melalui kebijakan berbasis data.</p>
                </div>
             </div>
             
             <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-none shadow-xl shadow-slate-200/40 bg-white/80 backdrop-blur-sm rounded-[2rem] hover:-translate-y-2 transition-all duration-300">
                   <CardHeader>
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                         <TrendingUp className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800">Menekan Turnover</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <p className="text-slate-600 leading-relaxed">Identifikasi divisi dengan tingkat stres tertinggi sebelum karyawan memutuskan *resign*. Langkah preventif yang menghemat biaya rekrutmen.</p>
                   </CardContent>
                </Card>
                
                <Card className="border-none shadow-xl shadow-slate-200/40 bg-white/80 backdrop-blur-sm rounded-[2rem] hover:-translate-y-2 transition-all duration-300">
                   <CardHeader>
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                         <Lightbulb className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800">Kebijakan Tepat Sasaran</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <p className="text-slate-600 leading-relaxed">Berhenti menebak-nebak program *wellbeing*. Gunakan data kami untuk membuat program SDM yang benar-benar dibutuhkan oleh tim.</p>
                   </CardContent>
                </Card>
                
                <Card className="border-none shadow-xl shadow-slate-200/40 bg-white/80 backdrop-blur-sm rounded-[2rem] hover:-translate-y-2 transition-all duration-300">
                   <CardHeader>
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                         <ShieldCheck className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800">Mitigasi Risiko Bisnis</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <p className="text-slate-600 leading-relaxed">Stres berkorelasi langsung dengan kecelakaan kerja dan *human error*. Pantau indikatornya demi menjaga kelancaran operasional bisnis.</p>
                   </CardContent>
                </Card>
             </div>
          </div>
        </section>

        {/* MANFAAT UNTUK KARYAWAN */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-40 translate-y-1/2 -translate-x-1/3"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
             <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Users2 className="w-5 h-5" />
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900">Bagi Karyawan</h2>
                  </div>
                  <p className="text-slate-600 text-lg max-w-xl">Memberikan ruang aman bagi pekerja untuk memahami kondisi psikologis mereka sendiri.</p>
                </div>
             </div>
             
             <div className="grid md:grid-cols-3 gap-6">
                <Card className="border border-slate-100 shadow-xl shadow-slate-200/40 bg-white rounded-[2rem] hover:-translate-y-2 transition-all duration-300">
                   <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                         <HeartHandshake className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800">Peningkatan Kesadaran Diri</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <p className="text-slate-600 leading-relaxed">Karyawan dapat melihat hasil asesmen mereka sendiri, membantu mereka menyadari *trigger* stres dan mengelolanya lebih awal.</p>
                   </CardContent>
                </Card>
                
                <Card className="border border-slate-100 shadow-xl shadow-slate-200/40 bg-white rounded-[2rem] hover:-translate-y-2 transition-all duration-300">
                   <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                         <Sparkles className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800">Mencegah Burnout</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <p className="text-slate-600 leading-relaxed">Dengan pemantauan berkala, karyawan tidak perlu menunggu sampai kelelahan mental ekstrem (burnout) sebelum mendapatkan perhatian.</p>
                   </CardContent>
                </Card>
                
                <Card className="border border-slate-100 shadow-xl shadow-slate-200/40 bg-white rounded-[2rem] hover:-translate-y-2 transition-all duration-300">
                   <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                         <ShieldCheck className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800">Aman dan Tanpa Judgement</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <p className="text-slate-600 leading-relaxed">Pengisian kuesioner yang terjamin privasinya membuat karyawan merasa dihargai, didengar, dan aman dari stigma di tempat kerja.</p>
                   </CardContent>
                </Card>
             </div>
          </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="bg-slate-900 py-24 text-white relative overflow-hidden mt-10">
           {/* Abstract grid lines */}
           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
           
           <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Mulai Transformasi Perusahaan Anda</h2>
              <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">Jangan biarkan stres menghambat potensi terbesar tim Anda. Gunakan platform kami dan rasakan perbedaannya.</p>
              <div className="flex justify-center gap-4">
                 <Link href="/demo"><Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full px-8 shadow-xl shadow-emerald-500/20 border-none h-12">Konsultasi Gratis</Button></Link>
                 <Link href="/demo"><Button size="lg" variant="outline" className="text-slate-800 font-bold rounded-full px-8 h-12 bg-white hover:bg-slate-100 border-none">Lihat Demo</Button></Link>
              </div>
           </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0f172a] text-slate-400 py-10">
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
            <span className="text-slate-500 text-xs">Part of Rhythm Of Empowerment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
