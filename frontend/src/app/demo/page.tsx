"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchApi } from "@/lib/api";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2, Timer } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const highlightDistinguishingWords = (text: string) => {
  const keywords = ["tidak pernah", "jarang sekali", "jarang", "kadang-kadang", "sering kali", "sering", "selalu"];
  for (const keyword of keywords) {
    const regex = new RegExp(`(${keyword})`, 'i');
    if (regex.test(text)) {
      const parts = text.split(regex);
      return parts.map((part, i) => 
        regex.test(part) ? <strong key={i} className="font-extrabold text-blue-900">{part}</strong> : part
      );
    }
  }
  return text;
};

function DemoContent() {
  const searchParams = useSearchParams();
  const qId = searchParams.get("q");

  const [loading, setLoading] = useState(true);
  const [questionnaire, setQuestionnaire] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Handle countdown initialization
  useEffect(() => {
    if (questionnaire?.has_timer && questionnaire?.timer_seconds && !isFinished) {
      setTimeLeft(questionnaire.timer_seconds);
    } else {
      setTimeLeft(null);
    }
  }, [currentIndex, questionnaire, isFinished]);

  // Handle countdown tick
  useEffect(() => {
    if (timeLeft === null || isFinished) return;
    
    if (timeLeft === 0) {
      // Auto advance
      if (currentIndex < (questionnaire?.questions?.length || 0) - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev !== null && prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, currentIndex, questionnaire]);

  useEffect(() => {
    if (!qId) return;
    setLoading(true);
    fetchApi(`/public/questionnaires/${qId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && !data.message) {
          setQuestionnaire(data);
        } else {
          setQuestionnaire(null);
        }
      })
      .catch(() => setQuestionnaire(null))
      .finally(() => setLoading(false));
  }, [qId]);

  if (!qId) return <div className="p-8 text-center text-slate-500 mt-20">Silakan pilih kuesioner dari menu Trial Test di halaman beranda.</div>;
  if (loading) return <div className="p-32 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  if (!questionnaire) return <div className="p-8 text-center text-red-500 mt-20 bg-red-50 rounded-lg max-w-md mx-auto">Kuesioner tidak ditemukan atau tidak aktif.</div>;

  const questions = questionnaire.questions || [];
  if (questions.length === 0) return <div className="p-8 text-center text-slate-500 mt-20">Kuesioner ini belum memiliki pertanyaan.</div>;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleAnswer = (val: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 400);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8 mt-10">
        <Card className="border-emerald-100 bg-gradient-to-b from-emerald-50 to-white shadow-xl shadow-emerald-500/10 text-center py-16 rounded-[2rem]">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
               <CheckCircle2 className="w-14 h-14 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Demo Selesai!</h2>
            <p className="text-slate-600 max-w-md text-lg leading-relaxed">
              Terima kasih telah mencoba demo kuesioner <span className="font-semibold text-slate-800">"{questionnaire.title}"</span>. 
            </p>
            <p className="text-sm text-slate-500 max-w-md -mt-2">
              Pada versi penuh, setelah pengisian selesai sistem akan secara otomatis menganalisis dan menampilkan hasil indeks stres Anda.
            </p>
            <Link href="/">
              <Button size="lg" className="mt-6 rounded-full px-10 bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/20 text-base h-14">Kembali ke Beranda</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 mt-6">
      <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Kembali ke Beranda
      </Link>
      
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{questionnaire.title}</h1>
            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 tracking-widest">DEMO</span>
        </div>
        <p className="text-slate-500 text-lg">{questionnaire.description}</p>
        
        <div className="mt-10 flex items-center justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
          <span>Pertanyaan {currentIndex + 1} <span className="text-slate-300 mx-1">/</span> {questions.length}</span>
          <span className="text-blue-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {currentQuestion && (
        <Card className="border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden rounded-[2rem]">
          <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{currentQuestion.dimension_name}</span>
            {timeLeft !== null && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timeLeft <= 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-200 text-slate-700'}`}>
                <Timer className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>
          <CardContent className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-12">
              {highlightDistinguishingWords(currentQuestion.text)}
            </h3>
            
            <div className="flex flex-col mb-4">
                <div className="flex justify-between px-2 mb-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span className="text-red-500">Sangat Tidak Setuju</span>
                    <span className="text-green-600">Sangat Setuju</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                   {[1, 2, 3, 4, 5, 6, 7].map(val => {
                     const isSelected = answers[currentQuestion.id] === val;
                     
                     // Color map from 1 (Red) to 7 (Green)
                     const colorMap: Record<number, { border: string, text: string, bg: string, hoverBg: string, shadow: string, ring: string }> = {
                        1: { border: "border-red-500", text: "text-red-600", bg: "bg-red-500", hoverBg: "hover:bg-red-50", shadow: "shadow-red-500/30", ring: "focus:ring-red-500/20" },
                        2: { border: "border-orange-500", text: "text-orange-600", bg: "bg-orange-500", hoverBg: "hover:bg-orange-50", shadow: "shadow-orange-500/30", ring: "focus:ring-orange-500/20" },
                        3: { border: "border-amber-500", text: "text-amber-600", bg: "bg-amber-500", hoverBg: "hover:bg-amber-50", shadow: "shadow-amber-500/30", ring: "focus:ring-amber-500/20" },
                        4: { border: "border-yellow-500", text: "text-yellow-600", bg: "bg-yellow-500", hoverBg: "hover:bg-yellow-50", shadow: "shadow-yellow-500/30", ring: "focus:ring-yellow-500/20" },
                        5: { border: "border-lime-500", text: "text-lime-600", bg: "bg-lime-500", hoverBg: "hover:bg-lime-50", shadow: "shadow-lime-500/30", ring: "focus:ring-lime-500/20" },
                        6: { border: "border-emerald-500", text: "text-emerald-600", bg: "bg-emerald-500", hoverBg: "hover:bg-emerald-50", shadow: "shadow-emerald-500/30", ring: "focus:ring-emerald-500/20" },
                        7: { border: "border-green-600", text: "text-green-600", bg: "bg-green-600", hoverBg: "hover:bg-green-50", shadow: "shadow-green-600/30", ring: "focus:ring-green-600/20" },
                     };
                     
                     const c = colorMap[val];

                     return (
                       <button 
                         key={val}
                         onClick={() => handleAnswer(val)}
                         className={`relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border-[2.5px] transition-all duration-300 font-extrabold text-lg md:text-xl outline-none focus:ring-4 ${c.ring} ${isSelected ? `${c.border} ${c.bg} text-white shadow-xl ${c.shadow} scale-110 z-10` : `${c.border} ${c.text} bg-white ${c.hoverBg} hover:scale-105 opacity-80 hover:opacity-100`}`}
                       >
                         {val}
                       </button>
                     );
                   })}
                </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex justify-between mt-10 px-4">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="rounded-full px-6 font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Sebelumnya
        </Button>
        
        <Button 
          onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
          disabled={currentIndex === questions.length - 1 || !answers[currentQuestion?.id]}
          className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 font-semibold h-12"
        >
          {currentIndex === questions.length - 1 ? "Selesai Demo" : "Selanjutnya"} 
          {currentIndex === questions.length - 1 ? <CheckCircle2 className="w-4 h-4 ml-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-4 pb-24 font-sans">
      <Suspense fallback={<div className="p-32 flex justify-center"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>}>
        <DemoContent />
      </Suspense>
    </div>
  );
}
