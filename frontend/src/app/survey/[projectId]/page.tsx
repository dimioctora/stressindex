"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, User, Loader2, Download, Share2 } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

export default function SurveyPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [project, setProject] = useState<any>(null);
  const [questionnaire, setQuestionnaire] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  
  const [step, setStep] = useState<"register" | "survey" | "result">("register");
  
  // Register State
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    company: "",
    department: "",
    role: "",
    age: "",
    gender: "",
  });

  // Survey State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!resultRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Hasil_Survei_${project?.title?.replace(/\s+/g, '_') || 'StressIndex'}.png`;
      link.click();
    } catch (err) {
      toast.error("Gagal mengunduh gambar");
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!resultRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
      if (blob && navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'hasil.png', { type: 'image/png' })] })) {
        const file = new File([blob], 'hasil_survei.png', { type: 'image/png' });
        await navigator.share({
          title: `Hasil Survei: ${project?.title}`,
          text: `Ini adalah hasil survei saya untuk ${project?.title}`,
          files: [file]
        });
      } else {
        toast.info("Browser Anda tidak mendukung Web Share API dengan gambar. Silakan unduh gambarnya saja.");
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return; // User canceled the share dialog
      toast.info("Gagal membagikan (mungkin diblokir browser). Mengunduh gambar otomatis...");
      handleDownload();
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (!projectId) return;
    
    fetchApi(`/public/surveys/${projectId}`)
      .then(async (res) => {
         if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Gagal memuat kuesioner");
         }
         return res.json();
      })
      .then((data) => {
        setProject(data.project);
        setQuestionnaire(data.questionnaire);
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  if (error || !project) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
         <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-100">
           <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
           <p className="text-slate-500 mb-6">{error || "Kuesioner tidak ditemukan"}</p>
           <Link href="/">
             <Button className="w-full h-12 rounded-xl">Kembali</Button>
           </Link>
         </div>
       </div>
     );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelect = (val: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
    
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
         const res = await fetchApi(`/public/surveys/${projectId}/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               respondent: formData,
               is_anonymous: isAnonymous,
               questionnaire_id: questionnaire.id,
               answers: answers
            })
         });

         if (!res.ok) throw new Error("Gagal mengirim jawaban");
         
         const data = await res.json();
         
         // Calculate result
         const dimensionCount = Object.keys(data.dimension_scores).length || 6;
         const avgDimensionScore = data.total_score / dimensionCount;

         let category = "RINGAN";
         let color = "text-emerald-500";
         let message = "Tingkat stres Anda saat ini tergolong ringan.";
         
         if (avgDimensionScore > 24) {
            category = "BERAT";
            color = "text-rose-600";
            message = "Tingkat stres Anda tergolong berat. Sangat disarankan untuk segera mencari bantuan profesional atau mendiskusikannya dengan pihak berwenang.";
         } else if (avgDimensionScore >= 10) {
            category = "SEDANG";
            color = "text-amber-500";
            message = "Anda mengalami stres tingkat sedang. Cobalah meluangkan waktu untuk istirahat dan evaluasi beban kerja Anda.";
         }

         setResultData({
            totalScore: data.total_score,
            avgDimensionScore,
            category,
            color,
            message,
            dimensionScores: data.dimension_scores
         });

         setStep("result");
      } catch (err) {
         toast.error("Gagal mengirim jawaban. Silakan coba lagi.");
      } finally {
         setIsSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const hasAnsweredCurrent = answers[currentQuestion?.id] !== undefined;

  const handleStartSurvey = (e: React.FormEvent) => {
     e.preventDefault();
     setStep("survey");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
         <div className="font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/30">SI</div>
            <span className="hidden sm:inline">{project.title.length > 30 ? project.title.substring(0, 30) + '...' : project.title}</span>
         </div>
         <div className="flex items-center gap-4 text-sm text-slate-500 font-semibold">
             {step === "register" ? "Langkah 1: Data Diri" : step === "survey" ? "Langkah 2: Kuesioner" : "Selesai"}
         </div>
         <Link href="/">
           <Button variant="ghost" size="sm" className="text-slate-500 rounded-full font-medium">Batal</Button>
         </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        {step === "register" && (
           <div className="w-full max-w-xl">
             <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
                   <User className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Registrasi Responden</h1>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                  {questionnaire.description || "Silakan isi data diri Anda. Anda dapat memilih mode anonim untuk menjaga privasi."}
                </p>

                <form onSubmit={handleStartSurvey} className="space-y-6">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex flex-col gap-1 pr-4">
                         <Label htmlFor="anonymous-mode" className="text-base font-bold flex items-center gap-2 text-slate-800">
                           <ShieldCheck className="w-4 h-4 text-emerald-500" /> Mode Anonim
                         </Label>
                         <span className="text-xs text-slate-500 font-medium">Sembunyikan identitas saya dari hasil laporan.</span>
                      </div>
                      <Switch 
                         id="anonymous-mode" 
                         checked={isAnonymous} 
                         onCheckedChange={setIsAnonymous}
                         className="data-[state=checked]:bg-emerald-500"
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      <div className="space-y-2.5">
                         <Label htmlFor="name" className="font-semibold text-slate-700">Nama Lengkap {isAnonymous ? "(Anonim)" : "*"}</Label>
                         <Input 
                           id="name" 
                           placeholder={isAnonymous ? "Rahasia" : "John Doe"} 
                           disabled={isAnonymous}
                           required={!isAnonymous}
                           value={isAnonymous ? "Anonymous User" : formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className="rounded-xl h-12 bg-slate-50/50"
                         />
                      </div>
                      <div className="space-y-2.5">
                         <Label htmlFor="email" className="font-semibold text-slate-700">Email {isAnonymous ? "(Anonim)" : "*"}</Label>
                         <Input 
                           id="email" 
                           type="email"
                           placeholder={isAnonymous ? "Rahasia" : "john@example.com"} 
                           disabled={isAnonymous}
                           required={!isAnonymous}
                           value={isAnonymous ? "" : formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="rounded-xl h-12 bg-slate-50/50"
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2.5">
                         <Label htmlFor="phone" className="font-semibold text-slate-700">No. Handphone {isAnonymous ? "(Anonim)" : "*"}</Label>
                         <Input 
                           id="phone" 
                           type="tel"
                           placeholder={isAnonymous ? "Rahasia" : "081234567890"} 
                           disabled={isAnonymous}
                           required={!isAnonymous}
                           value={isAnonymous ? "" : formData.phone}
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                           className="rounded-xl h-12 bg-slate-50/50"
                         />
                      </div>
                      <div className="space-y-2.5">
                         <Label htmlFor="city" className="font-semibold text-slate-700">Kota {isAnonymous ? "(Anonim)" : ""}</Label>
                         <Input 
                           id="city" 
                           placeholder={isAnonymous ? "Rahasia" : "Mis: Jakarta, Bandung"} 
                           disabled={isAnonymous}
                           value={isAnonymous ? "" : formData.city}
                           onChange={(e) => setFormData({...formData, city: e.target.value})}
                           className="rounded-xl h-12 bg-slate-50/50"
                         />
                      </div>
                   </div>

                   <div className="space-y-2.5">
                      <Label htmlFor="address" className="font-semibold text-slate-700">Alamat {isAnonymous ? "(Anonim)" : ""}</Label>
                      <Input 
                        id="address" 
                        placeholder={isAnonymous ? "Rahasia" : "Jl. Jendral Sudirman..."} 
                        disabled={isAnonymous}
                        value={isAnonymous ? "" : formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="rounded-xl h-12 bg-slate-50/50"
                      />
                   </div>

                   <div className="flex flex-col gap-2.5">
                      <Label htmlFor="company" className="font-semibold text-slate-700">Nama Perusahaan</Label>
                      <Input 
                        id="company" 
                        placeholder="Mis: PT Contoh Perusahaan" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="rounded-xl h-12 bg-slate-50/50"
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2.5">
                         <Label htmlFor="department" className="font-semibold text-slate-700">Departemen</Label>
                         <Input 
                           id="department" 
                           placeholder="Mis: IT, HR, Finance" 
                           value={formData.department}
                           onChange={(e) => setFormData({...formData, department: e.target.value})}
                           className="rounded-xl h-12 bg-slate-50/50"
                         />
                      </div>
                      <div className="space-y-2.5">
                         <Label htmlFor="role" className="font-semibold text-slate-700">Jabatan</Label>
                         <Input 
                           id="role" 
                           placeholder="Mis: Staff, Manager" 
                           value={formData.role}
                           onChange={(e) => setFormData({...formData, role: e.target.value})}
                           className="rounded-xl h-12 bg-slate-50/50"
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="flex flex-col gap-2.5">
                          <Label htmlFor="age" className="font-semibold text-slate-700">Usia *</Label>
                          <Input 
                            id="age" 
                            type="number"
                            placeholder="Mis: 28" 
                            required
                            min={17}
                            max={100}
                            value={formData.age}
                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                            className="rounded-xl h-12 bg-slate-50/50"
                          />
                       </div>
                       <div className="flex flex-col gap-2.5">
                          <Label htmlFor="gender" className="font-semibold text-slate-700">Jenis Kelamin *</Label>
                          <Select 
                            required
                            value={formData.gender} 
                            onValueChange={(val) => setFormData({...formData, gender: val})}
                          >
                            <SelectTrigger className="w-full rounded-xl h-12 bg-slate-50/50">
                              <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="L">Laki-laki (Pria)</SelectItem>
                              <SelectItem value="P">Perempuan (Wanita)</SelectItem>
                            </SelectContent>
                          </Select>
                       </div>
                    </div>

                   <Button type="submit" size="lg" className="w-full rounded-full h-14 text-base font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                      Mulai Kuesioner Sekarang <ArrowRight className="w-5 h-5 ml-2" />
                   </Button>
                </form>
             </div>
           </div>
        )}

        {step === "survey" && (
           <div className="w-full max-w-2xl">
             <div className="mb-10">
               <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Bagian 1: {questionnaire.title}
                  </span>
                  <span className="text-sm font-extrabold text-blue-600">
                    {currentIndex + 1} <span className="text-slate-400 font-medium">/ {questions.length}</span>
                  </span>
               </div>
               <Progress value={progress} className="h-2.5 bg-slate-200" />
             </div>

             <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 mb-8 transition-all">
                <div className="mb-2">
                   <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-bold mb-4 tracking-wide shadow-sm">
                     {currentQuestion.dimension_name}
                   </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-[1.3] mb-10 tracking-tight">
                  "{currentQuestion.text}"
                </h2>

                <div className="flex flex-col gap-3.5">
                  {currentQuestion.options?.map((option: any) => {
                    const isSelected = answers[currentQuestion.id] === option.score_value;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option.score_value)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 outline-none ${
                          isSelected 
                            ? "border-blue-600 bg-blue-50/50 shadow-md shadow-blue-500/10 scale-[1.02]" 
                            : "border-slate-100 hover:border-slate-300 hover:bg-slate-50 focus:border-blue-300 focus:bg-blue-50/30"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                             isSelected ? "border-blue-600" : "border-slate-300"
                           }`}>
                              {isSelected && <div className="w-3 h-3 bg-blue-600 rounded-full shadow-sm" />}
                           </div>
                           <span className={`font-semibold text-left ${isSelected ? "text-blue-700" : "text-slate-700"}`}>
                              {option.text}
                           </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
             </div>

             <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handlePrev} 
                  disabled={currentIndex === 0 || isSubmitting}
                  className="rounded-full px-6 text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-semibold h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Sebelumnya
                </Button>
                
                <Button 
                  size="lg" 
                  onClick={handleNext}
                  disabled={!hasAnsweredCurrent || isSubmitting}
                  className="rounded-full px-8 shadow-lg shadow-blue-500/25 bg-blue-600 hover:bg-blue-700 font-bold h-12 transition-all disabled:opacity-50 disabled:shadow-none"
                >
                  {isSubmitting ? (
                     "Memproses..."
                  ) : currentIndex === questions.length - 1 ? (
                    <>Kirim Jawaban <CheckCircle2 className="w-5 h-5 ml-2" /></>
                  ) : (
                    <>Selanjutnya <ArrowRight className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
             </div>
           </div>
        )}

        {step === "result" && resultData && (
            <div ref={resultRef} className="bg-white rounded-[2.5rem] p-8 md:p-14 max-w-lg w-full text-center shadow-2xl shadow-slate-200/50 border border-slate-100">
              
              <div className="mb-2">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-bold tracking-wide">
                   <User className="w-3 h-3" /> {isAnonymous ? "Responden Anonim" : formData.name}
                 </span>
              </div>
              
              <div className="mb-10 relative w-72 h-40 mx-auto flex flex-col items-center justify-end overflow-hidden mt-8">
                 <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                     <path 
                        d="M 10 50 A 40 40 0 0 1 90 50" 
                        fill="transparent" 
                        stroke="#f1f5f9" 
                        strokeWidth="12" 
                        strokeLinecap="round" 
                     />
                     <path 
                        d="M 10 50 A 40 40 0 0 1 90 50" 
                        fill="transparent" 
                        stroke={(resultData.avgDimensionScore || 0) > 24 ? "#e11d48" : (resultData.avgDimensionScore || 0) >= 10 ? "#f59e0b" : "#10b981"} 
                        strokeWidth="12" 
                        strokeLinecap="round" 
                        strokeDasharray="125.6" 
                        strokeDashoffset={125.6 - (125.6 * (((resultData.avgDimensionScore || 0) - 5) / 30))} 
                        className="transition-all duration-1000 ease-out"
                     />
                 </svg>
                 <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center mb-1">
                    <span className="text-6xl font-extrabold text-slate-800 tracking-tighter">{Math.round(resultData.avgDimensionScore || 0)}</span>
                    <span className={`text-sm font-extrabold uppercase tracking-widest mt-2 ${resultData.color}`}>{resultData.category}</span>
                 </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 mt-8 tracking-tight">Terima Kasih!</h2>
              <p className="text-slate-500 mb-10 leading-relaxed font-medium px-2">
                {resultData.message}
              </p>
              
              <div className="mb-6 bg-slate-50 rounded-2xl p-6 border border-slate-100 text-left">
                 <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                    <span>Skor per Dimensi</span>
                 </h3>
                 <div className="space-y-3">
                    {resultData.dimensionScores && Object.entries(resultData.dimensionScores).map(([dim, score]: [string, any]) => (
                       <div key={dim} className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-600">{dim}</span>
                          <span className="text-sm font-extrabold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">{score}</span>
                       </div>
                    ))}
                 </div>
              </div>
              
              <div className="flex flex-col gap-3.5" data-html2canvas-ignore="true">
                 <div className="grid grid-cols-2 gap-3.5">
                    <Button onClick={handleDownload} disabled={isExporting} variant="outline" className="w-full rounded-full h-14 font-bold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900" size="lg">
                       {isExporting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Download className="w-5 h-5 mr-2" />} Unduh
                    </Button>
                    <Button onClick={handleShare} disabled={isExporting} variant="outline" className="w-full rounded-full h-14 font-bold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900" size="lg">
                       {isExporting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Share2 className="w-5 h-5 mr-2" />} Bagikan
                    </Button>
                 </div>
                 <Link href="/">
                   <Button className="w-full rounded-full h-14 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" size="lg">Kembali ke Beranda</Button>
                 </Link>
              </div>
            </div>
        )}
      </main>
      
      <div className="py-8 text-center text-xs font-semibold tracking-wide text-slate-400 flex items-center justify-center gap-2">
         <ShieldCheck className="w-4 h-4 text-emerald-500" /> Data Anda dilindungi oleh enkripsi E2EE dan mematuhi standar privasi enterprise.
      </div>
    </div>
  );
}
