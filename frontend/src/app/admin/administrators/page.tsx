"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, Search, Filter, Shield, MoreHorizontal, UserCheck, Pencil, Trash2, Mail, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { fetchApi } from "@/lib/api";

export default function AdministratorsPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add'|'edit'>('add');
  const [formData, setFormData] = useState({ id: 0, name: '', email: '', password: '', role: 'admin' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAdmins = () => {
    setLoading(true);
    fetchApi("/admin/administrators")
      .then(res => res.json())
      .then(data => {
        setAdmins(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const openAddModal = () => {
      setModalMode('add');
      setFormData({ id: 0, name: '', email: '', password: '', role: 'admin' });
      setIsModalOpen(true);
  }

  const openEditModal = (admin: any) => {
      setModalMode('edit');
      setFormData({ id: admin.id, name: admin.name, email: admin.email, password: '', role: admin.role || 'admin' });
      setIsModalOpen(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      const isAdd = modalMode === 'add';
      const url = isAdd ? "/admin/administrators" : `/admin/administrators/${formData.id}`;
      const method = isAdd ? "POST" : "PUT";
      
      // If editing and password is empty, don't send it
      const payload: any = { ...formData };
      if (!isAdd && !payload.password) {
          delete payload.password;
      }

      try {
          const res = await fetchApi(url, {
              method: method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });
          if (res.ok) {
              const saved = await res.json();
              if (isAdd) {
                  setAdmins([saved, ...admins]);
              } else {
                  setAdmins(admins.map(a => a.id === saved.id ? saved : a));
              }
              setIsModalOpen(false);
          } else {
              alert(`Gagal ${isAdd ? 'menambahkan' : 'menyimpan'} admin. Pastikan data valid (email tidak duplikat).`);
          }
      } catch (err) {
          console.error(err);
      } finally {
          setIsSubmitting(false);
      }
  };

  const handleDeleteAdmin = async (id: number) => {
      if (!confirm("Apakah Anda yakin ingin menghapus admin ini?")) return;
      try {
          const res = await fetchApi(`/admin/administrators/${id}`, {
              method: "DELETE"
          });
          if (res.ok) {
              setAdmins(admins.filter(a => a.id !== id));
          }
      } catch (err) {
          console.error(err);
      }
  };

  const formatRole = (role: string) => {
      if (role === 'super_admin') return 'Super Admin';
      if (role === 'admin') return 'Admin';
      if (role === 'viewer') return 'Viewer';
      return 'Admin';
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Manajemen Akses</h1>
          <p className="text-slate-500 font-medium">Kelola akun administrator dan hak akses pengguna ke dashboard.</p>
        </div>
        <div className="flex gap-3">
           <Button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-5 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all">
               <Plus className="w-4 h-4 mr-2"/> Tambah Admin Baru
           </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-2">
           <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input type="text" placeholder="Cari nama atau email..." className="w-full bg-white border-slate-200 pl-10 rounded-xl h-11 text-sm focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all shadow-sm" />
           </div>
           <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm font-medium">Semua Role</Button>
              <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm"><Filter className="w-4 h-4" /></Button>
           </div>
      </div>

      <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/30 rounded-3xl bg-white overflow-hidden">
         <CardContent className="p-0">
            {loading ? (
               <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>
            ) : (
               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                           <th className="px-6 py-5 rounded-tl-3xl">Administrator</th>
                           <th className="px-6 py-5">Role Akses</th>
                           <th className="px-6 py-5">Status</th>
                           <th className="px-6 py-5 text-right rounded-tr-3xl">Aksi</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100/80">
                        {admins.map((admin: any) => (
                           <tr key={admin.id} className="hover:bg-blue-50/40 transition-colors group">
                              <td className="px-6 py-5">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-lg shadow-sm border border-blue-200/50">
                                       {admin.name.charAt(0)}
                                    </div>
                                    <div>
                                       <div className="font-bold text-slate-800 text-base mb-0.5">{admin.name}</div>
                                       <div className="text-slate-500 flex items-center gap-1.5 text-xs font-medium">
                                          <Mail className="w-3.5 h-3.5" /> {admin.email}
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-5">
                                 <Badge variant="outline" className={`rounded-lg px-2.5 py-1 font-bold text-xs uppercase tracking-wider ${admin.role === 'super_admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : admin.role === 'viewer' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                    {formatRole(admin.role)}
                                 </Badge>
                              </td>
                              <td className="px-6 py-5">
                                 <div className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full w-max text-xs border border-emerald-100">
                                    <UserCheck className="w-3.5 h-3.5" /> Aktif
                                 </div>
                              </td>
                              <td className="px-6 py-5">
                                 <div className="flex items-center justify-end gap-2">
                                    <Button onClick={() => openEditModal(admin)} variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                       <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button onClick={() => handleDeleteAdmin(admin.id)} variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                                       <Trash2 className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  {admins.length === 0 && (
                     <div className="py-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                           <Shield className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Belum Ada Admin</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">Sistem belum memiliki data administrator terdaftar selain Anda.</p>
                     </div>
                  )}
               </div>
            )}
         </CardContent>
      </Card>

      {/* Add/Edit Admin Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-600"/> {modalMode === 'add' ? 'Tambah Admin Baru' : 'Edit Data Admin'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white shadow-sm p-1.5 rounded-full border border-slate-200 transition-all"><X className="w-4 h-4"/></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                        <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Misal: Budi Santoso" className="rounded-xl bg-slate-50 border-slate-200 h-11 focus-visible:ring-blue-500" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Alamat Email</label>
                        <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="admin@perusahaan.com" className="rounded-xl bg-slate-50 border-slate-200 h-11 focus-visible:ring-blue-500" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Role Akses</label>
                        <select 
                            value={formData.role} 
                            onChange={e => setFormData({...formData, role: e.target.value})} 
                            className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                        >
                            <option value="super_admin">Super Admin (Akses Penuh)</option>
                            <option value="admin">Admin (Akses Terbatas)</option>
                            <option value="viewer">Viewer (Hanya Lihat Laporan)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Password {modalMode === 'edit' && <span className="text-slate-400 text-xs font-normal">(Kosongkan jika tidak diubah)</span>}</label>
                        <Input required={modalMode === 'add'} type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={modalMode === 'add' ? "Minimal 6 karakter" : "Biarkan kosong jika tidak diubah"} className="rounded-xl bg-slate-50 border-slate-200 h-11 focus-visible:ring-blue-500" />
                    </div>
                    <div className="pt-6 flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-xl h-11 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50">Batal</Button>
                        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-semibold shadow-lg shadow-blue-500/20">
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Simpan Data'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  )
}
