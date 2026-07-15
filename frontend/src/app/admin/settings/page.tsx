"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Save, Building2, UserCircle, Bell, Shield, Mail, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchApi } from "@/lib/api";

export default function SettingsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('company');

  useEffect(() => {
    fetchApi("/admin/settings")
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
     return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Pengaturan Sistem</h1>
        <p className="text-slate-500 font-medium">Kelola informasi profil perusahaan, preferensi, dan akun administrator.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
         {/* Tabs Sidebar */}
         <div className="w-full md:w-64 space-y-1.5 flex-shrink-0">
            <button 
                onClick={() => setActiveTab('company')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeTab === 'company' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <Building2 className="w-5 h-5" />
                Profil Perusahaan
            </button>
            <button 
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeTab === 'account' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <UserCircle className="w-5 h-5" />
                Akun Admin
            </button>
            <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeTab === 'notifications' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <Bell className="w-5 h-5" />
                Notifikasi
            </button>
            <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <Shield className="w-5 h-5" />
                Keamanan
            </button>
         </div>

         {/* Content Area */}
         <div className="flex-1 w-full">
            {activeTab === 'company' && (
                <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/30 rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-6">
                        <CardTitle className="text-xl font-bold text-slate-800">Profil Perusahaan</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">Informasi ini akan ditampilkan di halaman depan kuesioner karyawan.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-slate-700 font-bold">Nama Perusahaan</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input id="companyName" defaultValue={data?.company?.name || ''} className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-blue-500" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="domain" className="text-slate-700 font-bold">Domain Email (Whitelisting)</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input id="domain" defaultValue={data?.company?.domain || ''} className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-blue-500" />
                            </div>
                            <p className="text-xs font-medium text-slate-500 mt-1">Hanya email dengan domain ini yang bisa mengisi survei secara default.</p>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-blue-500/20 font-semibold transition-all">
                                <Save className="w-4 h-4 mr-2" />
                                Simpan Perubahan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === 'account' && (
                <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/30 rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-6">
                        <CardTitle className="text-xl font-bold text-slate-800">Akun Administrator</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">Perbarui profil dan kredensial login Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="adminName" className="text-slate-700 font-bold">Nama Lengkap</Label>
                            <div className="relative">
                                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input id="adminName" defaultValue={data?.admin?.name || ''} className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-blue-500" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="adminEmail" className="text-slate-700 font-bold">Alamat Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input id="adminEmail" type="email" defaultValue={data?.admin?.email || ''} className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-blue-500" />
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-blue-500/20 font-semibold transition-all">
                                <Save className="w-4 h-4 mr-2" />
                                Perbarui Akun
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {(activeTab === 'notifications' || activeTab === 'security') && (
                <div className="flex flex-col items-center justify-center p-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                        {activeTab === 'notifications' ? <Bell className="w-8 h-8 text-slate-400" /> : <Shield className="w-8 h-8 text-slate-400" />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Fitur Segera Hadir</h3>
                    <p className="text-slate-500 max-w-sm">Pengaturan {activeTab === 'notifications' ? 'notifikasi email' : 'keamanan lanjutan'} sedang dalam tahap pengembangan dan akan tersedia di update berikutnya.</p>
                </div>
            )}
         </div>
      </div>
    </div>
  )
}
