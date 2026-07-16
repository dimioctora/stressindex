"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toPng, toBlob } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, User, Loader2, Download, Share2, Timer, Info, ChevronDown } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

// Using plain text for short options

export default function SurveyPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [project, setProject] = useState<any>(null);
  const [questionnaire, setQuestionnaire] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  
  const [step, setStep] = useState<"register" | "intro" | "survey" | "result">("register");
  
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
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Handle countdown initialization
  useEffect(() => {
    if (step === "survey" && questionnaire?.has_timer && questionnaire?.timer_seconds && !isSubmitting && step !== "result") {
      setTimeLeft(questionnaire.timer_seconds);
    } else {
      setTimeLeft(null);
    }
  }, [currentIndex, questionnaire, step, isSubmitting]);

  // Handle countdown tick
  useEffect(() => {
    if (timeLeft === null || step !== "survey" || isSubmitting) return;
    
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev !== null && prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, step, isSubmitting, currentIndex, questions]);

  const handleDownload = async () => {
    if (!resultRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 150)); // Allow render to settle
      const image = await toPng(resultRef.current, { cacheBust: true, backgroundColor: "#ffffff", pixelRatio: 2 });
      const link = document.createElement("a");
      link.href = image;
      link.download = `Hasil_Survei_${project?.title?.replace(/\s+/g, '_') || 'StressIndex'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Gagal mengunduh gambar");
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!resultRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      const blob = await toBlob(resultRef.current, { cacheBust: true, backgroundColor: "#ffffff", pixelRatio: 2 });
      if (blob && navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'hasil.png', { type: 'image/png' })] })) {
        const file = new File([blob], 'hasil_survei.png', { type: 'image/png' });
        await navigator.share({
          title: `Hasil Survei: ${project?.title}`,
          text: `Ini adalah hasil survei saya untuk ${project?.title}`,
          files: [file]
        });
      } else if (blob && navigator.clipboard) {
        // Fallback: Copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        toast.success("Berhasil! Gambar disalin ke clipboard. Silakan Paste (Ctrl+V) di WhatsApp atau media sosial Anda.");
      } else {
        toast.info("Perangkat Anda tidak mendukung fitur bagikan. Mengunduh otomatis...");
        handleDownload();
      }
    } catch (err: any) {
      console.error("Share error:", err);
      if (err.name === 'AbortError') return; // User canceled the share dialog
      
      try {
         // Try clipboard as secondary fallback if share threw an error
         if (resultRef.current && navigator.clipboard) {
            const blob = await toBlob(resultRef.current, { cacheBust: true, backgroundColor: "#ffffff", pixelRatio: 2 });
            if (blob) {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                toast.success("Berhasil! Gambar disalin ke clipboard. Silakan Paste (Ctrl+V) di WhatsApp atau sosmed Anda.");
                return;
            }
         }
      } catch (e) {
         console.error("Clipboard fallback error:", e);
      }

      toast.info("Gagal membagikan. Mengunduh gambar otomatis...");
      handleDownload();
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (!slug) return;
    
    fetchApi(`/public/surveys/${slug}`)
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
  }, [slug]);

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
         const res = await fetchApi(`/public/surveys/${slug}/submit`, {
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
     setStep("intro");
  };

  const handleStartRealSurvey = () => {
     setStep("survey");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100">
      <header className="bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
         <div className="font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/30">SI</div>
            <span className="hidden sm:inline">{project.title.length > 30 ? project.title.substring(0, 30) + '...' : project.title}</span>
         </div>
         <div className="flex items-center gap-4 text-sm text-slate-500 font-semibold">
             {step === "register" ? "Langkah 1: Data Diri" : step === "intro" ? "Langkah 2: Informasi" : step === "survey" ? "Langkah 3: Kuesioner" : "Selesai"}
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
                  Silakan lengkapi data diri Anda di bawah ini sebelum melanjutkan.
                </p>

                <form onSubmit={handleStartSurvey} className="space-y-6">
                   {questionnaire?.allow_anonymous !== false && (
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
                   )}

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

                   {/* Alamat Removed */}

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
                      Lanjutkan <ArrowRight className="w-5 h-5 ml-2" />
                   </Button>
                </form>
             </div>
           </div>
        )}

        {step === "intro" && (
           <div className="w-full max-w-2xl">
              <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 text-center">
                 <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-8 mx-auto border border-blue-100 shadow-sm">
                    <Info className="w-10 h-10 text-blue-600" />
                 </div>
                 <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">{questionnaire.title}</h2>
                 <div className="text-slate-600 mb-10 leading-relaxed text-lg whitespace-pre-wrap">
                   {questionnaire.description || "Tidak ada deskripsi untuk kuesioner ini."}
                 </div>
                 
                 <Button onClick={handleStartRealSurvey} className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 text-lg font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95">
                    Mulai Kuesioner Sekarang <ArrowRight className="w-5 h-5 ml-2" />
                 </Button>
              </div>
           </div>
        )}

        {step === "survey" && currentQuestion && (
           <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500" key={currentQuestion.id}>
             <div className="mb-8 px-2">
               <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                    {questionnaire.title}
                  </span>
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-2">
                     <span className="text-sm font-extrabold text-blue-600">{currentIndex + 1}</span>
                     <span className="text-slate-300">/</span>
                     <span className="text-sm font-bold text-slate-500">{questions.length}</span>
                  </div>
               </div>
               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out rounded-full"
                   style={{ width: `${progress}%` }}
                 />
               </div>
             </div>

             <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-6 sm:p-10 md:p-12 mb-8 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 mb-6 flex justify-between items-start">
                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 border border-blue-100/50 rounded-2xl text-xs font-extrabold tracking-wide shadow-sm">
                     <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                     {currentQuestion.dimension_name}
                   </div>
                   {timeLeft !== null && (
                     <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold shadow-sm backdrop-blur-md ${timeLeft <= 10 ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' : 'bg-white/80 text-slate-700 border border-slate-100'}`}>
                       <Timer className="w-4 h-4" />
                       <span className="tabular-nums">{timeLeft}s</span>
                     </div>
                   )}
                </div>

                <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 leading-[1.3] mb-12 tracking-tight text-center">
                  "{currentQuestion.text}"
                </h2>

                <div className="relative z-10 flex flex-col gap-3">
                  {currentQuestion.options?.map((option: any, idx: number) => {
                    const isSelected = answers[currentQuestion.id] === option.score_value;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option.score_value)}
                        className={`group relative w-full flex items-center p-5 sm:p-6 rounded-3xl border-2 transition-all duration-300 outline-none overflow-hidden ${
                          isSelected 
                            ? "border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50/30 shadow-lg shadow-blue-500/10 scale-[1.02]" 
                            : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50 hover:shadow-md focus:border-blue-300 focus:bg-blue-50/20"
                        }`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        {isSelected && (
                           <div className="absolute inset-0 bg-blue-600/5 opacity-100 transition-opacity" />
                        )}
                        <div className="relative z-10 flex items-center justify-between w-full gap-4">
                           <span className={`text-lg sm:text-xl font-bold text-left transition-colors ${isSelected ? "text-blue-700" : "text-slate-700 group-hover:text-slate-900"}`}>
                              {option.text}
                           </span>
                           <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                             isSelected ? "border-blue-600 bg-blue-600" : "border-slate-200 bg-slate-50 group-hover:border-slate-300"
                           }`}>
                              {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                           </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
             </div>

             <div className="flex items-center justify-between gap-4 px-2">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handlePrev} 
                  disabled={currentIndex === 0 || isSubmitting}
                  className="rounded-2xl px-6 text-slate-500 border-slate-200 hover:bg-white hover:text-slate-800 hover:border-slate-300 font-bold h-14 bg-white/50 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-5 h-5 sm:mr-2" /> <span className="hidden sm:inline">Sebelumnya</span>
                </Button>
                
                <Button 
                  size="lg" 
                  onClick={handleNext}
                  disabled={!hasAnsweredCurrent || isSubmitting}
                  className="flex-1 max-w-[200px] rounded-2xl shadow-xl shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-14 transition-all disabled:opacity-50 disabled:shadow-none"
                >
                  {isSubmitting ? (
                     <Loader2 className="w-6 h-6 animate-spin" />
                  ) : currentIndex === questions.length - 1 ? (
                    <>Selesai <CheckCircle2 className="w-5 h-5 ml-2" /></>
                  ) : (
                    <>Lanjut <ArrowRight className="w-5 h-5 ml-2" /></>
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
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" viewBox="0 0 100 50">
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
                    <span>Skor per Aspek</span>
                 </h3>
                 <div className="space-y-3">
                    {resultData.dimensionScores && Object.entries(resultData.dimensionScores).map(([dim, score]: [string, any]) => {
                       const aspectDescriptions: Record<string, string> = {
                         "Ketaksaan Peran": "Ketidakjelasan mengenai tugas, tanggung jawab, dan ekspektasi pekerjaan.",
                         "Konflik Peran": "Tuntutan pekerjaan yang saling bertentangan atau tidak sejalan dengan nilai pribadi.",
                         "Beban Berlebih Kuantitatif": "Jumlah pekerjaan yang terlalu banyak dan tenggat waktu yang sempit.",
                         "Beban Berlebih Kualitatif": "Tingkat kesulitan atau tuntutan pekerjaan yang melebihi kemampuan yang dimiliki.",
                         "Pengembangan Karir": "Ketidakpastian mengenai masa depan promosi, keamanan kerja, atau peluang karir.",
                         "Tanggung jawab terhadap orang lain": "Tekanan akibat beban tanggung jawab terhadap kinerja dan kesejahteraan rekan kerja."
                       };
                       return (
                        <details key={dim} className="group cursor-pointer rounded-xl bg-white border border-slate-200 p-3.5 shadow-sm transition-all hover:border-slate-300">
                           <summary className="flex items-center justify-between list-none font-semibold text-slate-700 text-sm focus:outline-none">
                             <div className="flex items-center gap-2.5">
                               <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-300 group-open:-rotate-180" />
                               {dim}
                             </div>
                             <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">{score}</span>
                           </summary>
                           <div className="mt-3 text-xs text-slate-500 font-medium pl-6 leading-relaxed border-t border-slate-100 pt-3">
                             {aspectDescriptions[dim] || "Aspek yang mempengaruhi tingkat stres di lingkungan kerja."}
                           </div>
                        </details>
                       );
                    })}
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
      
      <footer className="py-6 text-center text-sm font-semibold text-slate-400 mt-auto flex items-center justify-center gap-2">
         <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
         <span className="text-left">
           Data anda telah dilindungi oleh standar privasi enterprise<br/>
           copyright &copy;2026 ROE.Indonesia
         </span>
      </footer>
    </div>
  );
}
