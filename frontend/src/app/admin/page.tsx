"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, ClipboardCheck, TrendingUp, AlertTriangle, Loader2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { fetchApi } from "@/lib/api";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi("/admin/dashboard")
      .then(res => {
        if (!res.ok) throw new Error('Failed to load data');
        return res.json();
      })
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  if (!data || !data.stats) {
    return <div className="p-8 text-center text-rose-500 font-medium bg-rose-50 rounded-2xl border border-rose-100">Gagal memuat data dari server. Pastikan backend berjalan.</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Overview Dashboard</h1>
          <p className="text-slate-500 font-medium">Ringkasan kondisi kesejahteraan dan asesmen karyawan perusahaan Anda.</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm shadow-slate-100 flex items-center gap-2 text-sm font-semibold text-slate-700">
           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
           Sistem Real-time Aktif
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wide">Total Responden</CardTitle>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50">
                <Users className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900 mb-2">{data.stats.total_respondents}</div>
            <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
               <TrendingUp className="w-4 h-4"/> +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wide">Skor Stres (Rata-rata)</CardTitle>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100/50">
                <TrendingUp className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900 mb-2">{data.stats.average_score}</div>
            <p className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md inline-block uppercase tracking-wider">Kategori Sedang</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wide">Survei Selesai</CardTitle>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/50">
                <ClipboardCheck className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900 mb-2">{data.stats.completed_surveys}</div>
            <p className="text-sm font-semibold text-slate-500">Tingkat partisipasi 78.6%</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wide">Perlu Perhatian</CardTitle>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100/50">
                <AlertTriangle className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900 mb-2">{data.stats.high_risk}</div>
            <p className="text-sm font-semibold text-rose-600">Karyawan berisiko tinggi</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         {/* Trend Chart */}
         <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white p-3">
            <CardHeader>
               <CardTitle className="text-xl font-extrabold text-slate-800">Tren Tingkat Stres Mingguan</CardTitle>
               <CardDescription className="text-slate-500 font-medium">Fluktuasi skor rata-rata karyawan dalam 5 hari terakhir.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.trend_data} margin={{ top: 10, right: 20, bottom: 5, left: -20 }}>
                     <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={4} dot={{ r: 5, fill: '#fff', strokeWidth: 3 }} activeDot={{ r: 8, stroke: '#60a5fa' }} />
                     <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b', fontWeight: 600 }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b', fontWeight: 600 }} domain={[0, 100]} />
                     <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }} cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }} />
                  </LineChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
         
         {/* Dimension Chart */}
         <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white p-3">
            <CardHeader>
               <CardTitle className="text-xl font-extrabold text-slate-800">Dimensi Stres Tertinggi</CardTitle>
               <CardDescription className="text-slate-500 font-medium">Faktor utama dominan penyebab stres berdasarkan asesmen.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.dimension_data} margin={{ top: 10, right: 20, bottom: 5, left: -20 }} layout="horizontal">
                     <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#6366f1"/>
                           <stop offset="100%" stopColor="#3b82f6"/>
                        </linearGradient>
                     </defs>
                     <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} maxBarSize={45} />
                     <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b', fontWeight: 600 }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b', fontWeight: 600 }} domain={[0, 100]} />
                     <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }} />
                  </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
