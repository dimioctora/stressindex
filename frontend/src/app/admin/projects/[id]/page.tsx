"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Users, FileText, Calendar, PieChart, Edit2, Check, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { fetchApi } from "@/lib/api";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({ start_date: '', end_date: '' });

  const handleUpdateSchedule = async () => {
    try {
      const res = await fetchApi(`/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleForm)
      });
      if (!res.ok) throw new Error("Gagal memperbarui jadwal");
      const data = await res.json();
      setProject(data.project);
      setIsEditingSchedule(false);
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui jadwal.");
    }
  };

  useEffect(() => {
    fetchApi(`/admin/projects/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal memuat detail proyek.");
        return res.json();
      })
      .then(data => {
        setProject(data);
        setScheduleForm({ start_date: data.start_date || '', end_date: data.end_date || '' });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  if (error || !project) {
    return (
      <div className="p-8 text-center text-rose-500 font-medium bg-rose-50 rounded-2xl border border-rose-100">
        {error || "Proyek tidak ditemukan."}
        <div className="mt-4">
          <Link href="/admin/projects">
            <Button variant="outline">Kembali ke Daftar Proyek</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-slate-700 rounded-full bg-white shadow-sm border border-slate-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">{project.title}</h1>
          <p className="text-slate-500 font-medium">Detail informasi proyek dan asesmen terkait.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-extrabold text-slate-800">Informasi Proyek</CardTitle>
                <CardDescription className="text-slate-500 mt-1">Deskripsi dan jadwal pengerjaan.</CardDescription>
              </div>
              <div>
                {project.status === 'active' && <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-md px-3 py-1 font-bold text-sm uppercase tracking-wider">Aktif</Badge>}
                {project.status === 'draft' && <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 rounded-md px-3 py-1 font-bold text-sm uppercase tracking-wider">Draft</Badge>}
                {project.status === 'archived' && <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200/60 rounded-md px-3 py-1 font-bold text-sm uppercase tracking-wider">Arsip</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-slate-700 leading-relaxed mb-6">
              {project.description || "Tidak ada deskripsi yang tersedia untuk proyek ini."}
            </p>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Jadwal Pelaksanaan</span>
                  
                  {isEditingSchedule ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input type="date" className="border border-slate-200 rounded px-2 py-1 text-sm bg-white" value={scheduleForm.start_date} onChange={(e) => setScheduleForm({...scheduleForm, start_date: e.target.value})} />
                      <span className="text-slate-400">s/d</span>
                      <input type="date" className="border border-slate-200 rounded px-2 py-1 text-sm bg-white" value={scheduleForm.end_date} onChange={(e) => setScheduleForm({...scheduleForm, end_date: e.target.value})} />
                    </div>
                  ) : (
                    <span>{project.start_date ? `${project.start_date} s/d ${project.end_date || 'Selesai'}` : 'Belum ditentukan'}</span>
                  )}
                </div>
              </div>
              
              <div>
                {isEditingSchedule ? (
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:bg-emerald-100" onClick={handleUpdateSchedule}><Check className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:bg-rose-100" onClick={() => setIsEditingSchedule(false)}><X className="w-4 h-4" /></Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={() => setIsEditingSchedule(true)}><Edit2 className="w-4 h-4" /></Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
             <CardTitle className="text-xl font-extrabold text-slate-800">Statistik Cepat</CardTitle>
             <CardDescription className="text-slate-500 mt-1">Ringkasan partisipan dan survei.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100/50 shadow-inner">
                   <Users className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Responden</p>
                   <p className="text-3xl font-extrabold text-slate-800">{project.respondents_count}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100/50 shadow-inner">
                   <FileText className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Kuesioner</p>
                   <p className="text-3xl font-extrabold text-slate-800">{project.questionnaires_count}</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Link href={`/admin/projects/${id}/respondents`} className="block">
          <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden group hover:border-blue-200 transition-colors cursor-pointer h-full">
            <div className="p-8 flex items-center justify-between h-full">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors border border-slate-100 group-hover:border-blue-100">
                  <Users className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Kelola Data Responden</h3>
                  <p className="text-slate-500 text-sm mt-1">Atur partisipan untuk proyek ini.</p>
                </div>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                &rarr;
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href={`/admin/projects/${id}/results`} className="block">
          <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden group hover:border-blue-200 transition-colors cursor-pointer h-full">
            <div className="p-8 flex items-center justify-between h-full">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors border border-slate-100 group-hover:border-blue-100">
                  <PieChart className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Hasil & Analisis</h3>
                  <p className="text-slate-500 text-sm mt-1">Lihat skor dan laporan asesmen.</p>
                </div>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                &rarr;
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
