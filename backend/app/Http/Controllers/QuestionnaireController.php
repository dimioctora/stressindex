<?php

namespace App\Http\Controllers;

use App\Models\Questionnaire;
use Illuminate\Http\Request;

class QuestionnaireController extends Controller
{
    public function index()
    {
        $questionnaires = Questionnaire::with(['dimensions' => function($q) {
            $q->withCount('questions');
        }])->get()->map(function ($q) {
            $totalQuestions = $q->dimensions->sum('questions_count');
            return [
                'id' => $q->id,
                'title' => $q->title,
                'description' => $q->description,
                'is_active' => $q->is_active,
                'dimensions_count' => $q->dimensions->count(),
                'questions_count' => $totalQuestions,
                'dimensions' => $q->dimensions->map(function($dim) {
                    return [
                        'name' => $dim->name,
                        'questions_count' => $dim->questions_count
                    ];
                })
            ];
        });

        return response()->json($questionnaires);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'is_active' => 'boolean'
        ]);

        $validated['is_active'] = $validated['is_active'] ?? false;
        $questionnaire = Questionnaire::create($validated);
        
        // Load default empty properties for the frontend
        $questionnaire->setAttribute('dimensions_count', 0);
        $questionnaire->setAttribute('questions_count', 0);
        $questionnaire->setAttribute('dimensions', []);

        return response()->json(['message' => 'Questionnaire created', 'data' => $questionnaire], 201);
    }

    public function show($id)
    {
        $questionnaire = Questionnaire::with(['dimensions' => function($q) {
            $q->withCount('questions');
        }])->find($id);

        if (!$questionnaire) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $totalQuestions = $questionnaire->dimensions->sum('questions_count');
        $questionnaire->setAttribute('total_questions', $totalQuestions);

        return response()->json($questionnaire);
    }

    public function storeDimension(Request $request, $id)
    {
        $questionnaire = Questionnaire::find($id);
        if (!$questionnaire) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $dimension = $questionnaire->dimensions()->create($validated);

        return response()->json(['message' => 'Dimension created', 'data' => $dimension], 201);
    }

    public function getQuestions($dimensionId)
    {
        $dimension = \App\Models\Dimension::find($dimensionId);
        if (!$dimension) {
            return response()->json(['message' => 'Dimension Not found'], 404);
        }

        $questions = $dimension->questions()->orderBy('order')->get();
        return response()->json($questions);
    }

    public function storeQuestion(Request $request, $dimensionId)
    {
        $dimension = \App\Models\Dimension::find($dimensionId);
        if (!$dimension) {
            return response()->json(['message' => 'Dimension Not found'], 404);
        }

        $validated = $request->validate([
            'text' => 'required|string',
            'type' => 'required|in:likert,text,multiple_choice',
            'is_required' => 'boolean',
            'order' => 'integer'
        ]);

        $validated['is_required'] = $validated['is_required'] ?? true;
        
        // Auto-assign order if not provided
        if (!isset($validated['order'])) {
            $maxOrder = $dimension->questions()->max('order');
            $validated['order'] = $maxOrder ? $maxOrder + 1 : 1;
        }

        $question = $dimension->questions()->create($validated);

        return response()->json(['message' => 'Question created', 'data' => $question], 201);
    }
}
