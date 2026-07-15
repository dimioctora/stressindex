<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Respondent extends Model
{
    use HasUlids;
    protected $fillable = ['project_id', 'email', 'demographic_data', 'is_anonymous'];
    protected $casts = ['demographic_data' => 'array', 'is_anonymous' => 'boolean'];
    public function project() { return $this->belongsTo(Project::class); }
    public function responses() { return $this->hasMany(Response::class); }
}