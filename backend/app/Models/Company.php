<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasUlids, SoftDeletes;
    protected $fillable = ['name', 'domain'];
    public function projects() { return $this->hasMany(Project::class); }
    public function users() { return $this->hasMany(User::class); }
}