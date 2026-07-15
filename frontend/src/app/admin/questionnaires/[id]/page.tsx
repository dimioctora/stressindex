"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Layers, Plus, CheckCircle2, FileQuestion, X, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { fetchApi } from "@/lib/api";

export default function QuestionnaireDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [questionnaire, setQuestionnaire] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddingDimension, setIsAddingDimension] = useState(false);
  const [dimensionForm, setDimensionForm] = useState({ name: '', description: '' });
  const [selectedDimension, setSelectedDimension] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [questionForm, setQuestionForm] = useState({ text: '', type: 'likert' });

  const fetchDetail = () => {
    fetchApi(`/admin/questionnaires/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal memuat kuesioner.");
        return res.json();
      })
      .then(data => {
        setQuestionnaire(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchQuestions = async (dimId: string) => {
    setIsQuestionsLoading(true);
    try {
      const res = await fetchApi(`/admin/dimensions/${dimId}/questions`);
      if(res.ok) {
        const data = await res.json();
        setQuestions(data);
      }
    } catch(err) { console.error(err); }
    setIsQuestionsLoading(false);
  };

  const handleAddQuestion = async () => {
    if(!selectedDimension || !questionForm.text) return;
    try {
      const res = await fetchApi(`/admin/dimensions/${selectedDimension.id}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionForm)
      });
      if(res.ok) {
        setQuestionForm({ text: '', type: 'likert' });
        fetchQuestions(selectedDimension.id);
        fetchDetail();
      }
    } catch(err) { console.error(err); }
  };

  const handleAddDimension = async () => {
    try {
      const res = await fetchApi(`/admin/questionnaires/${id}/dimensions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dimensionForm)
      });
      if (!res.ok) throw new Error("Gagal menambahkan dimensi");
      setIsAddingDimension(false);
      setDimensionForm({ name: '', description: '' });
      fetchDetail(); // Refresh data
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan dimensi baru.");
    }
  };

  if (loading) {
    return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>;
  }

  if (error || !questionnaire) {
    return (
      <div className="p-8 text-center text-rose-500 font-medium bg-rose-50 rounded-2xl border border-rose-100">
        {error || "Kuesioner tidak ditemukan."}
        <div className="mt-4">
          <Link href="/admin/questionnaires">
            <Button variant="outline">Kembali ke Daftar Kuesioner</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/questionnaires">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-slate-700 rounded-full bg-white shadow-sm border border-slate-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">{questionnaire.title}</h1>
          <p className="text-slate-500 font-medium">Atur dimensi dan detail pertanyaan untuk kuesioner ini.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Info Card */}
        <Card className="md:col-span-1 border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl bg-white overflow-hidden h-fit">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
            <div className="flex justify-between items-start mb-2">
              <CardTitle className="text-xl font-extrabold text-slate-800">Info Kuesioner</CardTitle>
              {questionnaire.is_active ? (
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-md px-2 py-0.5 font-bold text-xs uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Aktif</Badge>
              ) : (
                  <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 rounded-md px-2 py-0.5 font-bold text-xs uppercase tracking-wider">Draft</Badge>
              )}
            </div>
            <CardDescription className="text-slate-500 mt-1">{questionnaire.description || 'Tidak ada deskripsi.'}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                <Layers className="w-6 h-6 text-indigo-500 mb-2" />
                <p className="font-extrabold text-3xl text-slate-800">{questionnaire.dimensions?.length || 0}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Dimensi</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50">
                <FileQuestion className="w-6 h-6 text-purple-500 mb-2" />
                <p className="font-extrabold text-3xl text-slate-800">{questionnaire.total_questions || 0}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Pertanyaan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dimensions List */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Daftar Dimensi</h2>
            <Button onClick={() => setIsAddingDimension(true)} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-10 px-4 text-white font-semibold shadow-md shadow-indigo-500/20"><Plus className="w-4 h-4 mr-2"/> Tambah Dimensi</Button>
          </div>

          {isAddingDimension && (
             <Card className="border-2 border-indigo-200 shadow-xl shadow-indigo-100/50 rounded-2xl bg-white overflow-hidden">
                <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 p-5 flex flex-row items-center justify-between">
                   <CardTitle className="text-lg font-bold text-indigo-900">Dimensi Baru</CardTitle>
                   <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-8 w-8" onClick={() => setIsAddingDimension(false)}><X className="w-4 h-4"/></Button>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                   <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1 block">Nama Dimensi</label>
                      <Input value={dimensionForm.name} onChange={e => setDimensionForm({...dimensionForm, name: e.target.value})} placeholder="Misal: Beban Kerja" className="border-slate-200 focus-visible:ring-indigo-500" />
                   </div>
                   <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1 block">Deskripsi Singkat (Opsional)</label>
                      <Input value={dimensionForm.description} onChange={e => setDimensionForm({...dimensionForm, description: e.target.value})} placeholder="Penjelasan tentang dimensi ini..." className="border-slate-200 focus-visible:ring-indigo-500" />
                   </div>
                </CardContent>
                <CardFooter className="p-5 pt-0 bg-white flex justify-end gap-3 border-t border-slate-50 mt-4">
                   <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600" onClick={() => setIsAddingDimension(false)}>Batal</Button>
                   <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20" onClick={handleAddDimension}><Check className="w-4 h-4 mr-2"/> Simpan Dimensi</Button>
                </CardFooter>
             </Card>
          )}

          {questionnaire.dimensions?.length === 0 && !isAddingDimension ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
               <Layers className="w-10 h-10 text-slate-300 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-slate-800 mb-1">Belum Ada Dimensi</h3>
               <p className="text-slate-500 text-sm max-w-sm mx-auto">Tambahkan dimensi pertama untuk mulai mengelompokkan pertanyaan survei Anda.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {questionnaire.dimensions?.map((dim: any) => (
                <Card key={dim.id} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white overflow-hidden">
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{dim.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{dim.description || "Tidak ada deskripsi"}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                        <span className="block text-xl font-extrabold text-slate-700">{dim.questions_count || 0}</span>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Soal</span>
                      </div>
                      
<Dialog onOpenChange={(open) => {
    if(open) {
        setSelectedDimension(dim);
        fetchQuestions(dim.id);
    } else {
        setSelectedDimension(null);
        setQuestions([]);
    }
}}>
    <DialogTrigger render={<Button variant="outline" className="rounded-xl border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 font-semibold h-10" />}>
        Kelola Soal
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle>Kelola Soal: {dim.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm">Tambah Soal Baru</h4>
                <div className="space-y-2">
                    <Label>Pertanyaan</Label>
                    <Input placeholder="Masukkan pertanyaan..." value={questionForm.text} onChange={e => setQuestionForm({...questionForm, text: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Tipe Jawaban</Label>
                    <Select value={questionForm.type} onValueChange={(val) => setQuestionForm({...questionForm, type: val as string})}>
                        <SelectTrigger><SelectValue placeholder="Pilih tipe..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="likert">Skala Likert (1-5)</SelectItem>
                            <SelectItem value="multiple_choice">Pilihan Ganda</SelectItem>
                            <SelectItem value="text">Teks Bebas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleAddQuestion} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Simpan Soal</Button>
            </div>
            
            <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-sm">Daftar Soal ({questions.length})</h4>
                {isQuestionsLoading ? (
                    <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-indigo-600"/></div>
                ) : questions.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">Belum ada soal untuk dimensi ini.</p>
                ) : (
                    <div className="space-y-2">
                        {questions.map((q, idx) => (
                            <div key={q.id} className="p-3 border border-slate-200 rounded-lg flex gap-3 items-start">
                                <span className="bg-indigo-100 text-indigo-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">{idx+1}</span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{q.text}</p>
                                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Tipe: {q.type === 'likert' ? 'Skala Likert' : q.type === 'multiple_choice' ? 'Pilihan Ganda' : 'Teks Bebas'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </DialogContent>
</Dialog>

                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
