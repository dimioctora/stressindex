const fs = require('fs');
const file = 'frontend/src/app/admin/questionnaires/[id]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add imports
if (!content.includes('import { Dialog')) {
    content = content.replace('import { Input } from "@/components/ui/input"', 'import { Input } from "@/components/ui/input"\nimport { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"\nimport { Label } from "@/components/ui/label"\nimport { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"');
}

// Add state for selected dimension and questions
if (!content.includes('const [selectedDimension')) {
    content = content.replace("const [dimensionForm, setDimensionForm] = useState({ name: '', description: '' });", "const [dimensionForm, setDimensionForm] = useState({ name: '', description: '' });\n  const [selectedDimension, setSelectedDimension] = useState<any>(null);\n  const [questions, setQuestions] = useState<any[]>([]);\n  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);\n  const [questionForm, setQuestionForm] = useState({ text: '', type: 'likert' });");
}

// Add function to fetch questions
if (!content.includes('const fetchQuestions')) {
    content = content.replace('const handleAddDimension', `const fetchQuestions = async (dimId: string) => {
    setIsQuestionsLoading(true);
    try {
      const res = await fetchApi(\`/admin/dimensions/\${dimId}/questions\`);
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
      const res = await fetchApi(\`/admin/dimensions/\${selectedDimension.id}/questions\`, {
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

  const handleAddDimension`);
}

// Replace button with Dialog
const buttonRegex = /<Button variant="outline" className="rounded-xl border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 font-semibold h-10">[\s\S]*?Kelola Soal[\s\S]*?<\/Button>/g;

const dialogCode = `
<Dialog onOpenChange={(open) => {
    if(open) {
        setSelectedDimension(dim);
        fetchQuestions(dim.id);
    } else {
        setSelectedDimension(null);
        setQuestions([]);
    }
}}>
    <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 font-semibold h-10">
            Kelola Soal
        </Button>
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
                    <Select value={questionForm.type} onValueChange={(val) => setQuestionForm({...questionForm, type: val})}>
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
`;

content = content.replace(buttonRegex, dialogCode);

fs.writeFileSync(file, content);
console.log('Successfully updated questionnaires page with Dialog for Manage Questions');
