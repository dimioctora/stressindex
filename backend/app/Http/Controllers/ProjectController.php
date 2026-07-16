<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        // Get all projects, maybe with counts of respondents
        $projects = Project::withCount(['respondents', 'questionnaires'])->orderBy('created_at', 'desc')->get()->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'start_date' => $project->start_date ? \Carbon\Carbon::parse($project->start_date)->format('Y-m-d') : null,
                'end_date' => $project->end_date ? \Carbon\Carbon::parse($project->end_date)->format('Y-m-d') : null,
                'status' => $project->status,
                'respondents_count' => $project->respondents_count,
                'questionnaires_count' => $project->questionnaires_count,
            ];
        });

        return response()->json($projects);
    }

    public function getActive()
    {
        $projects = Project::where('status', 'active')->get(['id', 'slug', 'title', 'description']);
        return response()->json($projects);
    }

    public function show($id)
    {
        $project = Project::withCount(['respondents', 'questionnaires'])->find($id);
        
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json([
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'start_date' => $project->start_date ? \Carbon\Carbon::parse($project->start_date)->format('Y-m-d') : null,
            'end_date' => $project->end_date ? \Carbon\Carbon::parse($project->end_date)->format('Y-m-d') : null,
            'status' => $project->status,
            'respondents_count' => $project->respondents_count,
            'questionnaires_count' => $project->questionnaires_count,
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) return response()->json(['message' => 'Not found'], 404);

        $validated = $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|string|in:active,draft,archived',
        ]);

        $project->update($validated);

        return response()->json(['message' => 'Project updated successfully', 'project' => $project]);
    }

    public function respondents($id)
    {
        $project = Project::find($id);
        if (!$project) return response()->json(['message' => 'Not found'], 404);

        $respondents = $project->respondents()->with(['responses' => function($q) {
            $q->orderBy('created_at', 'desc')->limit(1);
        }])->get()->map(function ($respondent) {
            $latestResponse = $respondent->responses->first();
            $status = 'Belum';
            if ($latestResponse) {
                $status = $latestResponse->completed_at ? 'Selesai' : 'Proses';
            }
            
            $demographics = $respondent->demographic_data ?? [];
            
            return [
                'id' => $respondent->id,
                'name' => $demographics['name'] ?? $respondent->email ?? 'Anonim',
                'department' => $demographics['department'] ?? '-',
                'role' => $demographics['role'] ?? '-',
                'status' => $status,
                'score' => $latestResponse ? $latestResponse->total_score : null,
            ];
        });

        return response()->json($respondents);
    }

    public function results($id)
    {
        $project = Project::find($id);
        if (!$project) return response()->json(['message' => 'Not found'], 404);

        // Fetch responses related to this project's respondents
        $responses = \App\Models\Response::whereHas('respondent', function($q) use ($id) {
            $q->where('project_id', $id);
        })->whereNotNull('completed_at')->get();

        $averageScore = $responses->avg('total_score') ?? 0;
        $highRiskCount = $responses->where('total_score', '>', 70)->count();

        // Dummy trend data & dimensions for the specific project
        // In a real app, this would aggregate data from the responses
        $trendData = [
            ['name' => 'Senin', 'score' => 60],
            ['name' => 'Selasa', 'score' => 65],
            ['name' => 'Rabu', 'score' => 70],
            ['name' => 'Kamis', 'score' => 62],
            ['name' => 'Jumat', 'score' => 58],
        ];

        $dimensionData = [
            ['name' => 'Beban Kerja', 'value' => 80],
            ['name' => 'Konflik Peran', 'value' => 50],
            ['name' => 'Lingkungan', 'value' => 60],
            ['name' => 'Dukungan', 'value' => 40],
        ];

        return response()->json([
            'stats' => [
                'total_respondents' => $project->respondents()->count(),
                'completed_surveys' => $responses->count(),
                'average_score' => round($averageScore, 1),
                'high_risk' => $highRiskCount,
            ],
            'trend_data' => $trendData,
            'dimension_data' => $dimensionData,
        ]);
    }
}
