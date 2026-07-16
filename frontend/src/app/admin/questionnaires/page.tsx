"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, Search, Filter, FileQuestion, LayoutList, CheckCircle2, ChevronRight, Layers, X, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { fetchApi } from "@/lib/api";

export default function QuestionnairesPage() {
  const [questionnaires, setQuestionnaires] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQ = () => {
      fetchApi("/admin/questionnaires")
        .then(res => res.json())
        .then(data => {
          setQuestionnaires(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    };
    fetchQ();
  }, []);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });

  const handleAdd = async () => {
    try {
      const res = await fetchApi("/admin/questionnaires", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const data = await res.json();
        setQuestionnaires([data.data, ...questionnaires]);
        setIsAdding(false);
        setForm({ title: '', description: '' });
      } else {
        alert("Gagal menambahkan kuesioner.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Kuesioner & Aspek</h1>
          <p className="text-slate-500 font-medium">Susun daftar pertanyaan dan struktur dimensi untuk setiap survei.</p>
        </div>
        <div className="flex gap-3">
           <Button onClick={() => setIsAdding(true)} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 px-5 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all"><Plus className="w-4 h-4 mr-2"/> Buat Kuesioner Baru</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-2">
           <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input type="text" placeholder="Cari nama kuesioner..." className="w-full bg-white border-slate-200 pl-10 rounded-xl h-11 text-sm focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all shadow-sm" />
           </div>
           <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm font-medium">Semua Kuesioner</Button>
              <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm"><Filter className="w-4 h-4" /></Button>
           </div>
      </div>

      {isAdding && (
         <Card className="border-2 border-indigo-200 shadow-xl shadow-indigo-100/50 rounded-3xl bg-white overflow-hidden mb-6">
            <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 p-6 flex flex-row items-center justify-between">
               <CardTitle className="text-xl font-bold text-indigo-900">Buat Kuesioner Baru</CardTitle>
               <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600" onClick={() => setIsAdding(false)}><X className="w-5 h-5"/></Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1 block">Judul Kuesioner</label>
                  <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Misal: Asesmen Stres Kerja Tahunan" className="border-slate-200 focus-visible:ring-indigo-500" />
               </div>
               <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1 block">Deskripsi Singkat</label>
                  <Input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Deskripsi mengenai tujuan kuesioner..." className="border-slate-200 focus-visible:ring-indigo-500" />
               </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 bg-white flex justify-end gap-3 border-t border-slate-50 mt-4">
               <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600" onClick={() => setIsAdding(false)}>Batal</Button>
               <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20" onClick={handleAdd}><Check className="w-4 h-4 mr-2"/> Simpan Kuesioner</Button>
            </CardFooter>
         </Card>
      )}

      {loading ? (
         <div className="flex justify-center p-16"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionnaires.map((q: any) => (
               <Card key={q.id} className="border border-slate-200/60 shadow-xl shadow-slate-200/30 rounded-3xl bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col">
                  <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 flex flex-col items-start space-y-3">
                     <div className="flex justify-between items-start w-full">
                        {q.is_active ? (
                            <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-md px-2 py-0.5 font-bold text-xs uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Aktif</Badge>
                        ) : (
                            <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 rounded-md px-2 py-0.5 font-bold text-xs uppercase tracking-wider">Draft</Badge>
                        )}
                     </div>
                     <div>
                        <CardTitle className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{q.title}</CardTitle>
                        <CardDescription className="text-sm font-medium text-slate-500 mt-1 line-clamp-2">{q.description || 'Tidak ada deskripsi.'}</CardDescription>
                     </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                     <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col items-start gap-1 p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                           <Layers className="w-5 h-5 text-indigo-500 mb-1" />
                           <p className="font-extrabold text-2xl text-slate-800">{q.dimensions_count}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aspek</p>
                        </div>
                        <div className="flex flex-col items-start gap-1 p-3 rounded-2xl bg-purple-50/50 border border-purple-100/50">
                           <LayoutList className="w-5 h-5 text-purple-500 mb-1" />
                           <p className="font-extrabold text-2xl text-slate-800">{q.questions_count}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pertanyaan</p>
                        </div>
                     </div>
                     
                     <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Struktur Aspek</p>
                        <div className="space-y-2">
                            {q.dimensions.slice(0, 3).map((dim: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between bg-slate-50 py-2 px-3 rounded-xl border border-slate-100">
                                    <span className="text-sm font-semibold text-slate-700">{dim.name}</span>
                                    <span className="text-xs font-medium text-slate-400">{dim.questions_count} Soal</span>
                                </div>
                            ))}
                            {q.dimensions.length > 3 && (
                                <div className="text-center pt-1 text-xs font-medium text-slate-400">
                                    +{q.dimensions.length - 3} dimensi lainnya
                                </div>
                            )}
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 border-t border-slate-100 bg-slate-50/30">
                     <Link href={`/admin/questionnaires/${q.id}`} className="w-full">
                        <Button variant="ghost" className="w-full justify-between text-indigo-600 font-semibold hover:text-indigo-700 hover:bg-indigo-50 rounded-xl">
                           Lihat Detail Kuesioner
                           <ChevronRight className="w-4 h-4" />
                        </Button>
                     </Link>
                  </CardFooter>
               </Card>
            ))}
            
            {questionnaires.length === 0 && (
               <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                  <div className="w-16 h-16 mx-auto bg-white shadow-sm shadow-slate-200 rounded-2xl flex items-center justify-center mb-5">
                     <FileQuestion className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Kuesioner</h3>
                  <p className="text-slate-500 font-medium mb-6 max-w-sm mx-auto">Buat kuesioner pertama Anda untuk mulai menyusun alat ukur tingkat stres.</p>
                  <Button onClick={() => setIsAdding(true)} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 px-6 shadow-lg shadow-indigo-500/20 text-white font-semibold">Buat Kuesioner Baru</Button>
               </div>
            )}
         </div>
      )}
    </div>
  )
}
