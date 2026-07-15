<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasUlids, SoftDeletes;
    protected $fillable = ['company_id', 'title', 'description', 'start_date', 'end_date', 'status'];
    public function company() { return $this->belongsTo(Company::class); }
    public function questionnaires() { return $this->hasMany(Questionnaire::class); }
    public function respondents() { return $this->hasMany(Respondent::class); }
}