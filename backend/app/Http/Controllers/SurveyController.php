<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Respondent;
use App\Models\Response;
use App\Models\ResponseAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SurveyController extends Controller
{
    public function show($projectId)
    {
        $project = Project::with([
            'questionnaires' => function ($q) {
                $q->where('is_active', true)->with(['dimensions.questions.options' => function($q2) {
                    $q2->orderBy('order', 'asc');
                }]);
            }
        ])->find($projectId);

        if (!$project) {
            return response()->json(['message' => 'Proyek tidak ditemukan'], 404);
        }

        if ($project->status !== 'active') {
            return response()->json(['message' => 'Survei ini sedang tidak aktif'], 403);
        }

        $questionnaire = $project->questionnaires->first();

        if (!$questionnaire) {
            return response()->json(['message' => 'Kuesioner tidak ditemukan'], 404);
        }

        // For frontend convenience, flatten questions so we don't have to map through dimensions
        $questions = [];
        foreach ($questionnaire->dimensions as $dimension) {
            foreach ($dimension->questions as $question) {
                $q = $question->toArray();
                $q['dimension_name'] = $dimension->name;
                $questions[] = $q;
            }
        }

        // Sort questions by their original order
        usort($questions, function ($a, $b) {
            return $a['order'] <=> $b['order'];
        });

        return response()->json([
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
            ],
            'questionnaire' => [
                'id' => $questionnaire->id,
                'title' => $questionnaire->title,
                'description' => $questionnaire->description,
                'has_timer' => (bool)$questionnaire->has_timer,
                'timer_seconds' => $questionnaire->timer_seconds,
            ],
            'questions' => $questions
        ]);
    }

    public function submit(Request $request, $projectId)
    {
        $project = Project::find($projectId);
        
        if (!$project || $project->status !== 'active') {
            return response()->json(['message' => 'Survei tidak valid atau tidak aktif'], 400);
        }

        $validated = $request->validate([
            'respondent' => 'required|array',
            'respondent.name' => 'nullable|string',
            'respondent.email' => 'nullable|email',
            'respondent.phone' => 'nullable|string',
            'respondent.address' => 'nullable|string',
            'respondent.city' => 'nullable|string',
            'respondent.company' => 'nullable|string',
            'respondent.department' => 'nullable|string',
            'respondent.role' => 'nullable|string',
            'respondent.age' => 'nullable|integer',
            'respondent.gender' => 'nullable|string',
            'is_anonymous' => 'boolean',
            'answers' => 'required|array',
            'questionnaire_id' => 'required|string|exists:questionnaires,id'
        ]);

        $respondentData = $validated['respondent'];
        $isAnonymous = $validated['is_anonymous'] ?? false;
        
        $email = $isAnonymous ? 'anon-' . Str::uuid() . '@anonymous.local' : ($respondentData['email'] ?? 'anon-' . Str::uuid() . '@anonymous.local');

        $respondent = Respondent::create([
            'project_id' => $project->id,
            'email' => $email,
            'demographic_data' => $respondentData,
            'is_anonymous' => $isAnonymous
        ]);

        $totalScore = 0;
        $dimensionScores = [];

        foreach ($validated['answers'] as $qId => $score) {
            $scoreInt = (int) $score;
            $totalScore += $scoreInt;
            
            $question = \App\Models\Question::with('dimension')->find($qId);
            if ($question && $question->dimension) {
                $dimName = $question->dimension->name;
                if (!isset($dimensionScores[$dimName])) {
                    $dimensionScores[$dimName] = 0;
                }
                $dimensionScores[$dimName] += $scoreInt;
            }
        }

        $response = Response::create([
            'respondent_id' => $respondent->id,
            'questionnaire_id' => $validated['questionnaire_id'],
            'started_at' => now(),
            'completed_at' => now(),
            'total_score' => $totalScore
        ]);

        foreach ($validated['answers'] as $qId => $score) {
            ResponseAnswer::create([
                'response_id' => $response->id,
                'question_id' => $qId,
                'score' => (int) $score
            ]);
        }

        return response()->json([
            'message' => 'Jawaban berhasil disubmit',
            'total_score' => $totalScore,
            'dimension_scores' => $dimensionScores
        ]);
    }
}
