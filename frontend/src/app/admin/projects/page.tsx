"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, Search, Filter, FolderKanban, Calendar, Users, FileText, MoreHorizontal, PieChart, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { fetchApi } from "@/lib/api";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi("/admin/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleToggleStatus = async (projectId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';
    
    // Optimistic update
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, status: newStatus } : p
    ));

    try {
      const res = await fetchApi(`/admin/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Gagal mengubah status");
      toast.success(`Proyek berhasil di${newStatus === 'active' ? 'aktifkan' : 'non-aktifkan'}`);
    } catch (error) {
      // Revert on error
      setProjects(projects.map(p => 
        p.id === projectId ? { ...p, status: currentStatus } : p
      ));
      toast.error("Gagal mengubah status proyek");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Manajemen Proyek</h1>
          <p className="text-slate-500 font-medium">Atur periode asesmen dan kampanye survei perusahaan Anda.</p>
        </div>
        <div className="flex gap-3">
           <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-5 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all"><Plus className="w-4 h-4 mr-2"/> Buat Proyek Baru</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-2">
           <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input type="text" placeholder="Cari nama proyek..." className="w-full bg-white border-slate-200 pl-10 rounded-xl h-11 text-sm focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all shadow-sm" />
           </div>
           <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm font-medium">Semua Status</Button>
              <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm"><Filter className="w-4 h-4" /></Button>
           </div>
      </div>

      {loading ? (
         <div className="flex justify-center p-16"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
               <Card key={project.id} className="border border-slate-200/60 shadow-xl shadow-slate-200/30 rounded-3xl bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col">
                  <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 flex flex-row items-start justify-between space-y-0">
                     <div className="space-y-1.5 pr-2">
                        {project.status === 'active' && <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-md px-2 py-0.5 font-bold text-xs uppercase tracking-wider">Aktif</Badge>}
                        {project.status === 'draft' && <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 rounded-md px-2 py-0.5 font-bold text-xs uppercase tracking-wider">Draft</Badge>}
                        {project.status === 'archived' && <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200/60 rounded-md px-2 py-0.5 font-bold text-xs uppercase tracking-wider">Arsip</Badge>}
                        
                        <Link href={`/admin/projects/${project.id}`}>
                           <CardTitle className="text-xl font-bold text-slate-800 leading-tight pt-1 group-hover:text-blue-600 transition-colors">{project.title}</CardTitle>
                        </Link>
                     </div>
                     <div className="flex items-center gap-2">
                        <Switch 
                           checked={project.status === 'active'}
                           onCheckedChange={() => handleToggleStatus(project.id, project.status)}
                        />
                     </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                     <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-1">{project.description || 'Tidak ada deskripsi'}</p>
                     
                     <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100/50">
                              <Users className="w-5 h-5 text-blue-600" />
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Responden</p>
                              <p className="font-extrabold text-slate-700">{project.respondents_count}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
                              <FileText className="w-5 h-5 text-indigo-600" />
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kuesioner</p>
                              <p className="font-extrabold text-slate-700">{project.questionnaires_count}</p>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-slate-50 py-3 px-4 rounded-xl border border-slate-100">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {project.start_date ? `${project.start_date} s/d ${project.end_date || 'Selesai'}` : 'Jadwal belum ditentukan'}
                     </div>
                  </CardContent>
                  <div className="p-4 pt-4 border-t border-slate-100 bg-slate-50/30 mt-auto flex flex-col gap-2">
                     <Link href={`/admin/projects/${project.id}`}>
                        <Button className="w-full justify-between bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 font-semibold rounded-xl shadow-sm transition-all">
                           <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-slate-500" />
                              Data Responden
                           </div>
                           <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Button>
                     </Link>
                     <Link href={`/admin/projects/${project.id}`}>
                        <Button className="w-full justify-between bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 hover:border-blue-200 font-bold rounded-xl shadow-sm transition-all">
                           <div className="flex items-center gap-2">
                              <PieChart className="w-4 h-4 text-blue-600" />
                              Hasil & Analisis
                           </div>
                           <ChevronRight className="w-4 h-4 text-blue-500" />
                        </Button>
                     </Link>
                  </div>
               </Card>
            ))}
            
            {projects.length === 0 && (
               <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                  <div className="w-16 h-16 mx-auto bg-white shadow-sm shadow-slate-200 rounded-2xl flex items-center justify-center mb-5">
                     <FolderKanban className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Proyek</h3>
                  <p className="text-slate-500 font-medium mb-6 max-w-sm mx-auto">Anda belum membuat proyek asesmen apapun. Mulai dengan membuat proyek pertama Anda.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-6 shadow-lg shadow-blue-500/20 text-white font-semibold">Buat Proyek Baru</Button>
               </div>
            )}
         </div>
      )}
    </div>
  )
}
