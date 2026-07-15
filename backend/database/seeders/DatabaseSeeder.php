<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Project;
use App\Models\Questionnaire;
use App\Models\Dimension;
use App\Models\Question;
use App\Models\Option;
use App\Models\Respondent;
use App\Models\Response;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Company
        $company = Company::create([
            'name' => 'PT Meja Group Edugital',
            'domain' => 'roeindonesia.co.id'
        ]);

        // 2. Project
        $project = Project::create([
            'company_id' => $company->id,
            'title' => 'Asesmen Stres Tahunan 2026',
            'description' => 'Evaluasi tingkat stres karyawan di seluruh departemen',
            'status' => 'active'
        ]);

        // 3. Questionnaire
        $questionnaire = Questionnaire::create([
            'project_id' => $project->id,
            'title' => 'Kuesioner Stres Kerja ROE v1',
            'description' => 'Alat ukur standar untuk mengukur tingkat stres kerja.',
            'is_active' => true
        ]);

        // 3a. Dimensions
        $dimBeban = Dimension::create(['questionnaire_id' => $questionnaire->id, 'name' => 'Beban Kerja', 'description' => 'Beban kuantitatif dan kualitatif', 'weight' => 1.0]);
        $dimKonflik = Dimension::create(['questionnaire_id' => $questionnaire->id, 'name' => 'Konflik Peran', 'description' => 'Tuntutan peran yang bertentangan', 'weight' => 1.0]);
        $dimDukungan = Dimension::create(['questionnaire_id' => $questionnaire->id, 'name' => 'Dukungan Sosial', 'description' => 'Dukungan dari atasan dan rekan', 'weight' => 1.0]);

        // 3b. Questions
        $questions = [
            ['dim_id' => $dimBeban->id, 'text' => 'Saya merasa beban tugas yang diberikan melebihi kapasitas waktu saya.'],
            ['dim_id' => $dimBeban->id, 'text' => 'Saya sering harus bekerja lembur untuk menyelesaikan tugas.'],
            ['dim_id' => $dimKonflik->id, 'text' => 'Saya menerima instruksi yang bertentangan dari atasan yang berbeda.'],
            ['dim_id' => $dimKonflik->id, 'text' => 'Tugas saya seringkali tidak sesuai dengan deskripsi pekerjaan saya.'],
            ['dim_id' => $dimDukungan->id, 'text' => 'Saya merasa atasan saya tidak memberikan dukungan saat saya kesulitan.'],
        ];

        foreach ($questions as $idx => $q) {
            $question = Question::create([
                'dimension_id' => $q['dim_id'],
                'text' => $q['text'],
                'type' => 'likert',
                'order' => $idx + 1
            ]);

            // Options
            $options = [
                ['text' => 'Tidak Pernah', 'score' => 1],
                ['text' => 'Jarang', 'score' => 2],
                ['text' => 'Sering', 'score' => 3],
                ['text' => 'Selalu', 'score' => 4],
            ];

            foreach ($options as $optIdx => $opt) {
                Option::create([
                    'question_id' => $question->id,
                    'text' => $opt['text'],
                    'score_value' => $opt['score'],
                    'order' => $optIdx + 1
                ]);
            }
        }

        // 4. Respondents & Responses
        $respondentsData = [
            ['name' => 'Budi Santoso', 'dept' => 'IT', 'role' => 'Staff', 'score' => 45, 'status' => 'Selesai'],
            ['name' => 'Siti Aminah', 'dept' => 'Marketing', 'role' => 'Manager', 'score' => null, 'status' => 'Belum'],
            ['name' => 'Andi Wijaya', 'dept' => 'Finance', 'role' => 'Staff', 'score' => 85, 'status' => 'Selesai'],
            ['name' => 'Rina Marlina', 'dept' => 'HR', 'role' => 'Director', 'score' => 32, 'status' => 'Selesai'],
            ['name' => 'Joko Anwar', 'dept' => 'IT', 'role' => 'Manager', 'score' => null, 'status' => 'Proses'],
            ['name' => 'Bagas Pamungkas', 'dept' => 'Sales', 'role' => 'Staff', 'score' => 75, 'status' => 'Selesai'],
        ];

        foreach ($respondentsData as $data) {
            $respondent = Respondent::create([
                'project_id' => $project->id,
                'email' => Str::slug($data['name']) . '@roeindonesia.co.id',
                'demographic_data' => [
                    'name' => $data['name'],
                    'department' => $data['dept'],
                    'role' => $data['role']
                ],
                'is_anonymous' => false
            ]);

            if ($data['status'] !== 'Belum') {
                Response::create([
                    'respondent_id' => $respondent->id,
                    'questionnaire_id' => $questionnaire->id,
                    'started_at' => now()->subDays(rand(1, 5)),
                    'completed_at' => $data['status'] === 'Selesai' ? now()->subDays(rand(0, 4)) : null,
                    'total_score' => $data['score']
                ]);
            }
        }
    }
}
