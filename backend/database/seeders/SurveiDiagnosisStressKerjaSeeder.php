<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Project;
use App\Models\Questionnaire;
use App\Models\Dimension;
use App\Models\Question;
use App\Models\Option;
use Illuminate\Database\Seeder;

class SurveiDiagnosisStressKerjaSeeder extends Seeder
{
    public function run(): void
    {
        // Check or create company
        $company = Company::firstOrCreate(
            ['domain' => 'roeindonesia.co.id'],
            ['name' => 'PT Meja Group Edugital']
        );

        // Project
        $project = Project::create([
            'company_id' => $company->id,
            'title' => 'Survei Diagnosis Stress Kerja',
            'description' => 'Kuesioner ini dirancang untuk mengetahui sejauh mana berbagai kondisi pekerjaan menjadi sumber stress seseorang.',
            'status' => 'active'
        ]);

        // Questionnaire
        $questionnaire = Questionnaire::create([
            'project_id' => $project->id,
            'title' => 'Survei Diagnosis Stress Kerja',
            'description' => 'Responden diminta memilih seberapa sering kondisi tersebut menimbulkan stress',
            'is_active' => true
        ]);

        // Dimensions
        $dimensionsData = [
            'TP' => ['name' => 'Ketaksaan Peran', 'description' => 'Ketaksaan Peran (TP)'],
            'KP' => ['name' => 'Konflik Peran', 'description' => 'Konflik Peran (KP)'],
            'BBKuan' => ['name' => 'Beban Berlebih Kuantitatif', 'description' => 'Beban Berlebih Kuantitatif (BBKuan)'],
            'BBKual' => ['name' => 'Beban Berlebih Kualitatif', 'description' => 'Beban Berlebih Kualitatif (BBKual)'],
            'PK' => ['name' => 'Pengembangan Karir', 'description' => 'Pengembangan Karir (PK)'],
            'TJO' => ['name' => 'Tanggung jawab terhadap orang lain', 'description' => 'Tanggung jawab terhadap orang lain (TJO)'],
        ];

        $dimensions = [];
        foreach ($dimensionsData as $key => $data) {
            $dimensions[$key] = Dimension::create([
                'questionnaire_id' => $questionnaire->id,
                'name' => $data['name'],
                'description' => $data['description'],
                'weight' => 1.0
            ]);
        }

        // Questions
        $questionsData = [
            1 => ['dim' => 'TP', 'text' => 'Tujuan tugas-tugas dan pekerjaan saya tidak jelas'],
            2 => ['dim' => 'KP', 'text' => 'Saya mengerjakan tugas-tugas atau proyek-proyek yang tidak perlu'],
            3 => ['dim' => 'BBKuan', 'text' => 'Saya harus membawa pulang pekerjaan ke rumahsetiap sore hari atau akhir pekan agar dapat mengejar waktu'],
            4 => ['dim' => 'BBKual', 'text' => 'Tuntutan-tuntutan mengenai mutu pekerjaan terhadap saya keterlaluan'],
            5 => ['dim' => 'PK', 'text' => 'Saya tidak mempunyai kesempatan yang memadai untuk maju dalam organisasi ini'],
            6 => ['dim' => 'TJO', 'text' => 'Saya bertanggung jawab untuk pengembangan karyawan lain'],
            7 => ['dim' => 'TP', 'text' => 'Saya tidak jelas kepada siapa harus melapor dan/atau siapa yang melapor kepada saya'],
            8 => ['dim' => 'KP', 'text' => 'Saya terjepit di tengah-tengah antara atasan dan bawahan saya'],
            9 => ['dim' => 'BBKuan', 'text' => 'Saya menghabiskan waktu terlalu banyak untuk pertemuan-pertemuan yang tidak penting yang menyita waktu saya'],
            10 => ['dim' => 'BBKual', 'text' => 'Tugas-tugas yang diberikan kepada saya terlalu sulit dan/atau terlalu kompleks'],
            11 => ['dim' => 'PK', 'text' => 'Kalau saya ingin naik pangkat, saya harus mencari pekerjaan pada satuan kerja lain'],
            12 => ['dim' => 'TJO', 'text' => 'Saya bertanggung jawab untuk membimbing dan/atau membantu bawahan saya menyelesaikan problemnya'],
            13 => ['dim' => 'TP', 'text' => 'Saya tidak mempunyai wewenang untuk melaksanakan tanggung jawab pekerjaan saya'],
            14 => ['dim' => 'KP', 'text' => 'Jalur perintah yang formal tidak dipatuhi'],
            15 => ['dim' => 'BBKuan', 'text' => 'Saya bertanggung jawab atas semua proyek pekerjaan dalam waktu bersamaan yang hampir tidak dapat dikendalikan'],
            16 => ['dim' => 'BBKual', 'text' => 'Tugas-tugas tampaknya makin hari menjadi makin kompleks'],
            17 => ['dim' => 'PK', 'text' => 'Saya merugikan kemajuan karir saya dengan menetap pada organisasi ini'],
            18 => ['dim' => 'TJO', 'text' => 'Saya bertindak atau membuat keputusan-keputusan yang mempengaruhi keselamatan dan kesejahteraan orang lain'],
            19 => ['dim' => 'TP', 'text' => 'Saya tidak mengerti sepenuhnya apa yang diharapkan dari saya'],
            20 => ['dim' => 'KP', 'text' => 'Saya melakukan pekerjaan yang diterima oleh satu orang tapi tidak diterima oleh orang lain'],
            21 => ['dim' => 'BBKuan', 'text' => 'Saya benar-benar mempunyai pekerjaan yang lebih banyak daripada yang biasanya dapat dikerjakan dalam sehari'],
            22 => ['dim' => 'BBKual', 'text' => 'Organisasi mengharapkan saya melebihi keterampilan dan/atau kemampuan yang saya miliki'],
            23 => ['dim' => 'PK', 'text' => 'Saya hanya mempunyai sedikit kesempatan untuk berkembang dan belajar pengetahuan dan keterampilan baru dalam pekerjaan saya'],
            24 => ['dim' => 'TJO', 'text' => 'Tanggung jawab saya dalam organisasi ini lebih mengenai orang daripada barang'],
            25 => ['dim' => 'TP', 'text' => 'Saya tidak mengerti bagian yang diperankan pekerjaan saya dalam memenuhi tujuan organisasi keseluruhan'],
            26 => ['dim' => 'KP', 'text' => 'Saya menerima permintaan-permintaan yang saling bertentangan dari satu orang atau lebih'],
            27 => ['dim' => 'BBKuan', 'text' => 'Saya merasa bahwa saya betul-betul tidak punya waktu untuk istirahat berkala'],
            28 => ['dim' => 'BBKual', 'text' => 'Saya kurang terlatih dan/atau kurang pengalaman untuk melaksanakan tugas-tugas saya secara memadai'],
            29 => ['dim' => 'PK', 'text' => 'Saya merasa karir saya tidak berkembang'],
            30 => ['dim' => 'TJO', 'text' => 'Saya bertanggung jawab atas hari depan (karir) orang lain'],
        ];

        // Options
        $optionsData = [
            1 => 'Bila kondisi yang diuraikan tidak pernah menimbulkan stress',
            2 => 'Bila kondisi yang diuraikan jarang sekali menimbulkan stress',
            3 => 'Bila kondisi yang diuraikan jarang menimbulkan stress',
            4 => 'Bila kondisi yang diuraikan kadang-kadang menimbulkan stress',
            5 => 'Bila kondisi yang diuraikan sering menimbulkan stress',
            6 => 'Bila kondisi yang diuraikan sering kali menimbulkan stress',
            7 => 'Bila kondisi yang diuraikan selalu menimbulkan stress',
        ];

        foreach ($questionsData as $idx => $q) {
            $question = Question::create([
                'dimension_id' => $dimensions[$q['dim']]->id,
                'text' => $q['text'],
                'type' => 'likert',
                'order' => $idx
            ]);

            foreach ($optionsData as $score => $text) {
                Option::create([
                    'question_id' => $question->id,
                    'text' => $text,
                    'score_value' => $score,
                    'order' => $score
                ]);
            }
        }
    }
}
