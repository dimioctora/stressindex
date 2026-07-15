<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class ResponseAnswer extends Model
{
    use HasUlids;
    protected $fillable = ['response_id', 'question_id', 'option_id', 'text_value', 'score'];
    public function response() { return $this->belongsTo(Response::class); }
    public function question() { return $this->belongsTo(Question::class); }
    public function option() { return $this->belongsTo(Option::class); }
}