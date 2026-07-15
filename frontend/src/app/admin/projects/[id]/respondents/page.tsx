"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Plus, Loader2, Search, Filter, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { fetchApi } from "@/lib/api";

export default function ProjectRespondentsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
                      <TableHead className="py-5 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs text-right h-auto">Skor Stres</TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-slate-500">Tidak ada data responden.</TableCell>
                      </TableRow>
                   ) : users.map((user: any) => (
                      <TableRow key={user.id} className="border-slate-100/60 hover:bg-slate-50/80 transition-colors group">
                         <TableCell className="px-6 py-5 font-bold text-slate-800 text-base">{user.name}</TableCell>
                         <TableCell className="px-6 py-5 text-slate-600 font-medium">{user.department}</TableCell>
                         <TableCell className="px-6 py-5 text-slate-600 font-medium">{user.role}</TableCell>
                         <TableCell className="px-6 py-5">
                            {user.status === 'Selesai' && <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200/60 rounded-lg px-3 py-1.5 font-bold shadow-sm shadow-emerald-100">Selesai</Badge>}
                            {user.status === 'Belum' && <Badge variant="outline" className="text-slate-500 rounded-lg px-3 py-1.5 font-bold border-slate-200 bg-slate-50 shadow-sm shadow-slate-100">Belum Mulai</Badge>}
                            {user.status === 'Proses' && <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200/60 rounded-lg px-3 py-1.5 font-bold shadow-sm shadow-amber-100">Dalam Proses</Badge>}
                         </TableCell>
                         <TableCell className="px-6 py-5 text-right font-extrabold text-xl">
                            {user.score ? (
                               <span className={user.score > 70 ? 'text-rose-600' : 'text-emerald-600'}>{user.score}</span>
                            ) : (
                               <span className="text-slate-300 font-medium text-lg">-</span>
                            )}
                         </TableCell>
                      </TableRow>
                   ))}
                </TableBody>
             </Table>
           )}
        </CardContent>
      </Card>
    </div>
  )
}
