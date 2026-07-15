<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasUlids;
    protected $fillable = ['respondent_id', 'questionnaire_id', 'started_at', 'completed_at', 'total_score'];
    protected $casts = ['started_at' => 'datetime', 'completed_at' => 'datetime'];
    public function respondent() { return $this->belongsTo(Respondent::class); }
    public function questionnaire() { return $this->belongsTo(Questionnaire::class); }
    public function answers() { return $this->hasMany(ResponseAnswer::class); }
}