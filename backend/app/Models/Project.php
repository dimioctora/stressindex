<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasUlids, SoftDeletes;
    protected $fillable = ['company_id', 'title', 'slug', 'description', 'start_date', 'end_date', 'status'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title) . '-' . Str::random(5);
            }
        });

        static::updating(function ($project) {
            if ($project->isDirty('title') && empty($project->slug)) {
                $project->slug = Str::slug($project->title) . '-' . Str::random(5);
            }
        });
    }
    public function company() { return $this->belongsTo(Company::class); }
    public function questionnaires() { return $this->hasMany(Questionnaire::class); }
    public function respondents() { return $this->hasMany(Respondent::class); }
}