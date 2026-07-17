"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Plus, Loader2, Search, Filter, ArrowLeft, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

export default function ProjectRespondentsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchRespondents = () => {
    setLoading(true);
    fetchApi(`/admin/projects/${id}/respondents`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data responden ini? Tindakan ini tidak dapat dibatalkan.")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetchApi(`/admin/respondents/${userId}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        toast.success("Data responden berhasil dihapus");
        setSelectedUser(null);
        fetchRespondents();
      } else {
        const errData = await res.json().catch(() => null);
        toast.error(errData?.message || "Gagal menghapus data responden");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menghapus data");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchRespondents();
  }, [id]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/admin/projects/${id}`}>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-slate-700 rounded-full bg-white shadow-sm border border-slate-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Data Responden Proyek</h1>
          <p className="text-slate-500 font-medium">Kelola partisipan spesifik untuk proyek ini.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-3 ml-auto">
           <Button variant="outline" className="bg-white rounded-xl h-11 px-5 border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 transition-all"><Download className="w-4 h-4 mr-2"/> Ekspor CSV</Button>
           <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-5 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all"><Plus className="w-4 h-4 mr-2"/> Tambah Data</Button>
        </div>
      </div>

      <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
           <div>
              <CardTitle className="text-xl font-extrabold text-slate-800">Daftar Partisipan Asesmen</CardTitle>
              <CardDescription className="text-slate-500 font-medium mt-1">Total {users.length} responden terdaftar dalam proyek ini.</CardDescription>
           </div>
           <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input type="text" placeholder="Cari nama atau departemen..." className="w-full bg-slate-50 border-slate-200 pl-10 rounded-xl h-11 text-sm focus-visible:ring-blue-500/20 focus-visible:border-blue-500 focus-visible:bg-white transition-all shadow-none" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm"><Filter className="w-4 h-4" /></Button>
           </div>
        </div>
        
        <CardContent className="p-0">
           {loading ? (
             <div className="flex justify-center p-16"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>
           ) : (
             <Table>
                <TableHeader className="bg-slate-50/80">
                   <TableRow className="border-slate-100 hover:bg-transparent">
                      <TableHead className="py-5 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs h-auto">Nama Responden</TableHead>
                      <TableHead className="py-5 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs h-auto">Departemen</TableHead>
                      <TableHead className="py-5 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs h-auto">Jabatan</TableHead>
                      <TableHead className="py-5 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs h-auto">Status Survei</TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-slate-500">Tidak ada data responden.</TableCell>
                      </TableRow>
                   ) : users.map((user: any) => (
                      <TableRow 
                        key={user.id} 
                        onClick={() => setSelectedUser(user)}
                        className="cursor-pointer border-slate-100/60 hover:bg-slate-50/80 transition-colors group"
                      >
                         <TableCell className="px-6 py-5 font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">{user.name}</TableCell>
                         <TableCell className="px-6 py-5 text-slate-600 font-medium">{user.department}</TableCell>
                         <TableCell className="px-6 py-5 text-slate-600 font-medium">{user.role}</TableCell>
                         <TableCell className="px-6 py-5">
                            {user.status === 'Selesai' && <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-lg px-3 py-1.5 font-bold shadow-sm shadow-emerald-100">Selesai</Badge>}
                            {user.status === 'Belum' && <Badge variant="outline" className="text-slate-500 rounded-lg px-3 py-1.5 font-bold border-slate-200 bg-slate-50 shadow-sm shadow-slate-100">Belum Mulai</Badge>}
                            {user.status === 'Proses' && <Badge className="bg-amber-50 text-amber-600 border border-amber-200/60 rounded-lg px-3 py-1.5 font-bold shadow-sm shadow-amber-100">Dalam Proses</Badge>}
                         </TableCell>
                      </TableRow>
                   ))}
                </TableBody>
             </Table>
           )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="sm:max-w-md bg-white border-slate-200">
           {selectedUser && (
             <>
               <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-slate-800">Detail Responden</DialogTitle>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDelete(selectedUser.id)}
                      disabled={isDeleting}
                      className="h-8 px-3 text-xs bg-rose-500 hover:bg-rose-600 text-white"
                    >
                      {isDeleting ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Trash2 className="w-3 h-3 mr-2" />}
                      Hapus Responden
                    </Button>
                  </div>
               </DialogHeader>
               <div className="py-2 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm border-b border-slate-100 pb-4">
                     <div>
                       <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-bold">Nama</p>
                       <p className="font-semibold text-slate-800">{selectedUser.name}</p>
                     </div>
                     <div>
                       <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-bold">Status Survei</p>
                       <p className="font-semibold text-slate-800">{selectedUser.status}</p>
                     </div>
                     <div>
                       <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-bold">Departemen</p>
                       <p className="font-semibold text-slate-800">{selectedUser.department}</p>
                     </div>
                     <div>
                       <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-bold">Jabatan</p>
                       <p className="font-semibold text-slate-800">{selectedUser.role}</p>
                     </div>
                  </div>
                  
                  {selectedUser.aspects ? (
                     <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center pb-3 mb-2 border-b border-slate-100">
                          <span className="font-bold text-slate-700">Total Skor Stres</span>
                          <span className={`font-extrabold text-xl ${selectedUser.score > 70 ? 'text-rose-600' : 'text-emerald-600'}`}>{selectedUser.score}</span>
                        </div>
                        {Object.entries(selectedUser.aspects).map(([aspectName, aspectScore]) => (
                           <div key={aspectName} className="flex justify-between items-center text-sm px-1 py-1.5 hover:bg-slate-50 rounded-md transition-colors">
                              <span className="text-slate-600 font-medium">{aspectName}</span>
                              <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">{String(aspectScore)}</span>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div className="text-center py-6">
                       <p className="text-slate-500 text-sm font-medium">Responden ini belum menyelesaikan survei sehingga data aspek belum tersedia.</p>
                     </div>
                  )}
               </div>
             </>
           )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
