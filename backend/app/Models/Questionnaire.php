<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Questionnaire extends Model
{
    use HasUlids, SoftDeletes;
    protected $fillable = ['project_id', 'title', 'description', 'is_active', 'has_timer', 'timer_seconds'];
    public function project() { return $this->belongsTo(Project::class); }
    public function dimensions() { return $this->hasMany(Dimension::class); }
    public function responses() { return $this->hasMany(Response::class); }
}