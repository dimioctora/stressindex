<?php

namespace App\Http\Controllers;

use App\Models\Respondent;
use App\Models\Response;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalRespondents = Respondent::count();
        $completedSurveys = Response::whereNotNull('completed_at')->count();
        $averageScore = Response::whereNotNull('completed_at')->avg('total_score') ?? 0;
        
        $highRiskCount = Response::whereNotNull('completed_at')->where('total_score', '>', 70)->count();

        // Dummy trend data for now until we build real date aggregation
        $trendData = [
            ['name' => 'Senin', 'score' => 65],
            ['name' => 'Selasa', 'score' => 68],
            ['name' => 'Rabu', 'score' => 72],
            ['name' => 'Kamis', 'score' => 75],
            ['name' => 'Jumat', 'score' => 60],
        ];

        // Dummy dimension data
        $dimensionData = [
            ['name' => 'Beban Kerja', 'value' => 78],
            ['name' => 'Konflik Peran', 'value' => 45],
            ['name' => 'Lingkungan', 'value' => 50],
            ['name' => 'Dukungan', 'value' => 30],
        ];

        return response()->json([
            'stats' => [
                'total_respondents' => $totalRespondents,
                'average_score' => round($averageScore, 1),
                'completed_surveys' => $completedSurveys,
                'high_risk' => $highRiskCount,
            ],
            'trend_data' => $trendData,
            'dimension_data' => $dimensionData,
        ]);
    }
}
