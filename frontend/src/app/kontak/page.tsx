import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, MapPin, Phone, Mail, User, Send, Building2 } from "lucide-react";
import TrialTestMenu from "@/components/TrialTestMenu";

export default function KontakPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-hidden">
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2.5">
            <img src="/images/roe-icon.png" alt="StressIndex Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">STRESS<span className="text-blue-600">INDEX</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">Beranda</Link>
            <Link href="/tentang" className="text-slate-500 hover:text-slate-900 transition-colors">Tentang</Link>
            <Link href="/fitur" className="text-slate-500 hover:text-slate-900 transition-colors">Fitur</Link>
            <Link href="/manfaat" className="text-slate-500 hover:text-slate-900 transition-colors">Manfaat</Link>
            <Link href="/kontak" className="text-slate-900 font-semibold hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600">Kontak</Link>
          </nav>
          <div className="flex items-center gap-3">
            <TrialTestMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 relative pt-16">
        {/* Subtle Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50/50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70"></div>
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 md:px-8 pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide w-fit mb-4">
             <Send className="h-3 w-3" />
             HUBUNGI KAMI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            Mari Berdiskusi Lebih Lanjut
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Punya pertanyaan seputar platform atau ingin menjadwalkan konsultasi? Tim ahli kami siap membantu Anda membangun lingkungan kerja yang lebih sehat.
          </p>
        </section>

        {/* CONTACT SECTION */}
        <section className="container mx-auto px-4 md:px-8 pb-24">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
             
             {/* Left - Contact Info */}
             <div className="w-full lg:w-5/12 bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20 translate-y-1/2 -translate-x-1/3"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                   <div className="mb-10">
                      <h2 className="text-2xl font-bold mb-2">Informasi Kontak</h2>
                      <p className="text-slate-400">Tim kami akan membalas pesan Anda sesegera mungkin.</p>
                   </div>
                   
                   <div className="space-y-8 flex-1">
                      {/* Company Name */}
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-blue-400">
                            <Building2 className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="font-semibold text-lg text-white mb-1">PT Meja Group Edugital</div>
                            <div className="text-slate-400 text-sm">Induk Perusahaan & Pengelola Stress Index</div>
                         </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-emerald-400">
                            <Phone className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="font-semibold text-white mb-1">Telepon & WhatsApp</div>
                            <div className="text-slate-300">0877-7088-0221</div>
                            <div className="text-slate-400 text-sm mt-1 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Budi Bagus Prasetyo (ROE Founder)</div>
                         </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-amber-400">
                            <Mail className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="font-semibold text-white mb-1">Email Resmi</div>
                            <div className="text-slate-300">info@roeindonesia.co.id</div>
                            <div className="text-slate-300 mt-1">events@roeindonesia.co.id</div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-12 pt-8 border-t border-slate-800 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                         <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                         <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                         <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Right - Contact Form Placeholder */}
             <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan Langsung</h3>
                <form className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                         <input type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-semibold text-slate-700">Email Perusahaan</label>
                         <input type="email" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="john@company.com" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Subjek Diskusi</label>
                      <input type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Misal: Demo Platform / Harga Layanan" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Pesan Anda</label>
                      <textarea className="w-full h-32 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" placeholder="Tuliskan kebutuhan atau pertanyaan Anda di sini..."></textarea>
                   </div>
                   <Button size="lg" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all">
                      Kirim Pesan
                   </Button>
                </form>
             </div>
             
          </div>
        </section>

        {/* LOCATIONS SECTION */}
        <section className="bg-slate-50 py-24 border-y border-slate-100">
           <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">Lokasi Kantor Kami</h2>
                 <p className="text-slate-500 text-lg">Kunjungi kami untuk diskusi tatap muka secara langsung</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                 {/* Kantor Jakarta */}
                 <Card className="border-none shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="h-48 bg-slate-200 relative w-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Jakarta" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-6 text-white font-bold text-xl">Kantor Jakarta</div>
                    </div>
                    <CardContent className="p-6">
                       <div className="flex gap-4 items-start">
                          <MapPin className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                          <p className="text-slate-600 leading-relaxed font-medium">
                            Gedung Granadi Jl. H. R. Rasuna Said blok X-1 kav. 8-9, Kuningan Timur, Jakarta Selatan
                          </p>
                       </div>
                    </CardContent>
                 </Card>

                 {/* Kantor Bogor */}
                 <Card className="border-none shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="h-48 bg-slate-200 relative w-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" alt="Bogor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-6 text-white font-bold text-xl">Kantor Bogor</div>
                    </div>
                    <CardContent className="p-6">
                       <div className="flex gap-4 items-start">
                          <MapPin className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                          <p className="text-slate-600 leading-relaxed font-medium">
                            Komplek Soho Green Valley Blok B.2 No. 03 Bogor Nirwana Residence, Bogor – Jawa Barat
                          </p>
                       </div>
                    </CardContent>
                 </Card>
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
