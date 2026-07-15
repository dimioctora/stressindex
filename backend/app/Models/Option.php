<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasUlids;
    protected $fillable = ['question_id', 'text', 'score_value', 'order'];
    public function question() { return $this->belongsTo(Question::class); }
}