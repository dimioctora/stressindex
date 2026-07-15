"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, ClipboardCheck, TrendingUp, AlertTriangle, Loader2, ArrowLeft } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchApi } from "@/lib/api";

export default function ProjectResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi(`/admin/projects/${id}/results`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching results data:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  if (!data || !data.stats) {
    return (
      <div className="p-8 text-center text-rose-500 font-medium bg-rose-50 rounded-2xl border border-rose-100">
        Gagal memuat data hasil dari server.
        <div className="mt-4">
          <Link href={`/admin/projects/${id}`}>
            <Button variant="outline">Kembali ke Detail Proyek</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href={`/admin/projects/${id}`}>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-slate-700 rounded-full bg-white shadow-sm border border-slate-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Hasil & Analisis Proyek</h1>
          <p className="text-slate-500 font-medium">Ringkasan kondisi kesejahteraan karyawan untuk proyek ini.</p>
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
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         {/* Trend Chart */}
         <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white p-3">
            <CardHeader>
               <CardTitle className="text-xl font-extrabold text-slate-800">Tren Tingkat Stres Harian (Proyek)</CardTitle>
               <CardDescription className="text-slate-500 font-medium">Fluktuasi skor rata-rata pada proyek ini.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.trend_data} margin={{ top: 10, right: 20, bottom: 5, left: -20 }}>
                     <defs>
                        <linearGradient id="colorScore2" x1="0" y1="0" x2="0" y2="1">
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
               <CardDescription className="text-slate-500 font-medium">Faktor utama penyebab stres dalam proyek ini.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.dimension_data} margin={{ top: 10, right: 20, bottom: 5, left: -20 }} layout="horizontal">
                     <defs>
                        <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#6366f1"/>
                           <stop offset="100%" stopColor="#3b82f6"/>
                        </linearGradient>
                     </defs>
                     <Bar dataKey="value" fill="url(#barGradient2)" radius={[8, 8, 0, 0]} maxBarSize={45} />
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
