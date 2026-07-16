<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\RespondentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);
    Route::get('/respondents', [RespondentController::class, 'index']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::get('/projects/{id}/respondents', [ProjectController::class, 'respondents']);
    Route::get('/projects/{id}/results', [ProjectController::class, 'results']);
    Route::get('/questionnaires', [QuestionnaireController::class, 'index']);
    Route::post('/questionnaires', [QuestionnaireController::class, 'store']);
    Route::get('/questionnaires/{id}', [QuestionnaireController::class, 'show']);
    Route::put('/questionnaires/{id}', [QuestionnaireController::class, 'update']);
    Route::post('/questionnaires/{id}/dimensions', [QuestionnaireController::class, 'storeDimension']);
    
    // Dimension Questions
    Route::get('/dimensions/{dimensionId}/questions', [QuestionnaireController::class, 'getQuestions']);
    Route::post('/dimensions/{dimensionId}/questions', [QuestionnaireController::class, 'storeQuestion']);
    
    // Questions (Edit & Delete)
    Route::put('/questions/{id}', [QuestionnaireController::class, 'updateQuestion']);
    Route::delete('/questions/{id}', [QuestionnaireController::class, 'deleteQuestion']);
    
    Route::get('/settings', [SettingController::class, 'index']);
    Route::apiResource('/administrators', UserController::class);
});

Route::prefix('public')->group(function () {
    Route::get('/projects', [ProjectController::class, 'getActive']);
    Route::get('/questionnaires', [QuestionnaireController::class, 'getActive']);
    Route::get('/questionnaires/{id}', [QuestionnaireController::class, 'showPublic']);
    Route::get('/surveys/{projectIdOrSlug}', [SurveyController::class, 'show']);
    Route::post('/surveys/{projectIdOrSlug}/submit', [SurveyController::class, 'submit']);
});
