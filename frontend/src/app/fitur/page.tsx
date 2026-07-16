import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, ClipboardList, Zap, ShieldCheck, Download, Target, PieChart, Lock, SlidersHorizontal } from "lucide-react";
import TrialTestMenu from "@/components/TrialTestMenu";

export default function FiturPage() {
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
            <Link href="/fitur" className="text-slate-900 font-semibold hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600">Fitur</Link>
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
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 md:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide w-fit mb-6">
             <SlidersHorizontal className="h-3 w-3" />
             FITUR PLATFORM
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
            Alat yang Kuat untuk <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Analisis Mendalam</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Jelajahi berbagai fitur yang dirancang khusus untuk mempermudah perusahaan Anda dalam mengukur, menganalisis, dan mengelola tingkat stres karyawan secara efektif.
          </p>
        </section>

        {/* DETAILED FEATURES LIST */}
        <section className="py-12 pb-24">
          <div className="container mx-auto px-4 md:px-8 space-y-24">
            
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2">
                <div className="relative p-2 bg-gradient-to-tr from-purple-100 to-indigo-50 rounded-[2rem]">
                   <div className="bg-white rounded-[1.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-80 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-4 left-4 w-20 h-20 bg-purple-100 rounded-full blur-2xl opacity-50"></div>
                      <div className="absolute bottom-4 right-4 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>
                      
                      <div className="z-10 bg-white border border-slate-100 shadow-lg rounded-2xl p-6 w-full max-w-sm">
                         <div className="space-y-4">
                            <div className="h-3 w-2/3 bg-slate-100 rounded-full"></div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-slate-200"></div><div className="h-2.5 w-full bg-slate-100 rounded-full"></div></div>
                              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-purple-500 bg-purple-50"></div><div className="h-2.5 w-4/5 bg-slate-100 rounded-full"></div></div>
                              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-slate-200"></div><div className="h-2.5 w-5/6 bg-slate-100 rounded-full"></div></div>
                            </div>
                            <div className="h-8 w-full bg-indigo-600 rounded-lg mt-4 shadow-md shadow-indigo-200"></div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-6">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Kuesioner Terstandarisasi</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Platform kami menggunakan instrumen psikologis yang telah divalidasi dan diuji secara empiris oleh tim pakar di ROE Indonesia, memberikan jaminan reliabilitas pada setiap data yang dikumpulkan.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-purple-500" /> Disusun berdasarkan teori psikologi industri modern.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-purple-500" /> Format pertanyaan yang intuitif (Skala Likert 1-7).</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-purple-500" /> Ramah pengguna, dapat diakses lewat HP atau komputer.</li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2">
                <div className="relative p-2 bg-gradient-to-tl from-emerald-100 to-teal-50 rounded-[2rem]">
                   <div className="bg-white rounded-[1.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-80 flex items-center justify-center relative overflow-hidden">
                      <div className="z-10 relative">
                          <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 rounded-full"></div>
                          <div className="w-48 h-48 border-8 border-slate-50 rounded-full relative shadow-inner flex items-center justify-center">
                              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="46" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="289" strokeDashoffset="50" strokeLinecap="round" />
                              </svg>
                              <div className="text-center">
                                 <span className="text-4xl font-extrabold text-slate-800">82<span className="text-xl">%</span></span>
                                 <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-1">Selesai</div>
                              </div>
                          </div>
                      </div>
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Skoring & Perhitungan Otomatis</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Ucapkan selamat tinggal pada perhitungan manual yang rentan kesalahan (human error). Sistem cerdas kami akan langsung mengolah jawaban dan mengonversinya menjadi skor yang bermakna.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-emerald-500" /> Hasil skoring keluar secara real-time.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-emerald-500" /> Kalkulasi per dimensi psikologis secara terpisah.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-emerald-500" /> Pengurangan bias pengolahan data.</li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2">
                <div className="relative p-2 bg-gradient-to-tr from-amber-100 to-orange-50 rounded-[2rem]">
                   <div className="bg-white rounded-[1.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-80 flex flex-col items-center justify-center relative overflow-hidden gap-4">
                      {/* Bar chart mockup */}
                      <div className="w-full h-40 border-b-2 border-l-2 border-slate-200 flex items-end gap-4 px-4 pb-0 pt-4 z-10 relative">
                         <div className="w-full bg-amber-400/80 rounded-t-sm h-[40%] relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">40</div></div>
                         <div className="w-full bg-rose-500/80 rounded-t-sm h-[80%] relative shadow-[0_0_15px_rgba(244,63,94,0.3)]"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-600">80</div></div>
                         <div className="w-full bg-blue-500/80 rounded-t-sm h-[60%] relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">60</div></div>
                         <div className="w-full bg-emerald-500/80 rounded-t-sm h-[30%] relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">30</div></div>
                      </div>
                      <div className="w-full flex justify-between px-8 text-[10px] font-bold text-slate-400 mt-2 z-10">
                         <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-6">
                  <PieChart className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Dashboard Interaktif & Insight</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Pahami lanskap mental perusahaan Anda lewat visualisasi data yang memukau. Dashboard kami memampukan Anda menelusuri data (drill-down) dari tingkat makro hingga mikro.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-amber-500" /> Analisis komparasi antar divisi/departemen.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-amber-500" /> Identifikasi hotspot tingkat stres tertinggi.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-amber-500" /> Pemantauan tren stres dari waktu ke waktu.</li>
                </ul>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2">
                <div className="relative p-2 bg-gradient-to-tl from-slate-200 to-slate-100 rounded-[2rem]">
                   <div className="bg-slate-900 rounded-[1.5rem] p-8 shadow-2xl border border-slate-700 h-80 flex flex-col items-center justify-center relative overflow-hidden gap-4">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]"></div>
                      
                      <div className="relative">
                          <Lock className="w-20 h-20 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                          <ShieldCheck className="w-8 h-8 text-emerald-400 absolute -bottom-2 -right-2 bg-slate-900 rounded-full" />
                      </div>
                      
                      <div className="mt-4 flex flex-col items-center">
                         <div className="text-white font-bold text-lg tracking-wider">END-TO-END ENCRYPTION</div>
                         <div className="flex gap-1 mt-2">
                             <div className="w-2 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                             <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
                             <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Privasi & Keamanan Tingkat Enterprise</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Kami memahami kerahasiaan informasi psikologis karyawan. Sistem Stress Index dibangun dengan protokol keamanan yang ketat demi menjaga kerahasiaan responden.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-blue-500" /> Enkripsi data standar industri.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-blue-500" /> Opsi survei anonim untuk kejujuran maksimal.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-blue-500" /> Role-based access control (RBAC) untuk manajemen data.</li>
                </ul>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2">
                <div className="relative p-2 bg-gradient-to-tr from-rose-100 to-pink-50 rounded-[2rem]">
                   <div className="bg-white rounded-[1.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-80 flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="w-48 h-56 bg-slate-50 border border-slate-200 rounded-lg shadow-sm relative p-4 flex flex-col transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                          <div className="flex justify-between items-center mb-4">
                              <div className="h-2 w-12 bg-rose-200 rounded-full"></div>
                              <Download className="w-4 h-4 text-slate-400" />
                          </div>
                          <div className="h-4 w-3/4 bg-slate-800 rounded-md mb-2"></div>
                          <div className="h-2 w-1/2 bg-slate-200 rounded-full mb-6"></div>
                          
                          <div className="grid grid-cols-2 gap-2 mb-4">
                              <div className="h-12 bg-slate-100 rounded-md"></div>
                              <div className="h-12 bg-slate-100 rounded-md"></div>
                          </div>
                          
                          <div className="mt-auto h-6 w-full bg-rose-500 rounded-md text-white flex items-center justify-center text-[8px] font-bold shadow-md shadow-rose-200">Export PDF</div>
                      </div>
                      
                      <div className="absolute right-8 bottom-8 w-12 h-12 bg-emerald-500 rounded-full shadow-lg shadow-emerald-200 flex items-center justify-center text-white transform rotate-12">
                         <span className="font-bold text-xs">CSV</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-100 text-rose-600 mb-6">
                  <Download className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Laporan & Ekspor Fleksibel</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Buat presentasi manajemen atau analisis mendalam dengan format file yang Anda inginkan. Kami mempermudah proses pembuatan laporan untuk kebutuhan HR dan manajerial.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-rose-500" /> Ekspor data raw dalam bentuk CSV/Excel.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-rose-500" /> Laporan PDF instan dengan visualisasi grafik.</li>
                  <li className="flex items-center gap-3 text-slate-600 font-medium"><Target className="w-5 h-5 text-rose-500" /> Integrasi data untuk sistem HRIS (Segera Hadir).</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="bg-blue-600 py-20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
           <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Rasakan Pengalaman Penuh Stress Index</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">Coba dan eksplorasi seluruh fitur canggih yang telah kami siapkan melalui versi Demo.</p>
              <Link href="/demo"><Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 font-bold rounded-full px-8 shadow-xl">Coba Demo Sekarang</Button></Link>
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
            <span className="text-slate-500 text-xs">Part of Rhythm Of Empowerment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
