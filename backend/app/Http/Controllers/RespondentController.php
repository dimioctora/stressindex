<?php

namespace App\Http\Controllers;

use App\Models\Respondent;
use Illuminate\Http\Request;

class RespondentController extends Controller
{
    public function index()
    {
        // Get all respondents with their latest response
        $respondents = Respondent::with(['responses' => function($q) {
            $q->orderBy('created_at', 'desc')->limit(1);
        }])->get()->map(function ($respondent) {
            $latestResponse = $respondent->responses->first();
            $status = 'Belum';
            if ($latestResponse) {
                $status = $latestResponse->completed_at ? 'Selesai' : 'Proses';
            }
            
            // Extract from demographic_data
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
}
