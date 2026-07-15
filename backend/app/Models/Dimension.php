<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Dimension extends Model
{
    use HasUlids;
    protected $fillable = ['questionnaire_id', 'name', 'description', 'weight'];
    public function questionnaire() { return $this->belongsTo(Questionnaire::class); }
    public function questions() { return $this->hasMany(Question::class); }
}