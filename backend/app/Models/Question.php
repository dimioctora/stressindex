<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasUlids;
    protected $fillable = ['dimension_id', 'text', 'type', 'is_required', 'order'];
    public function dimension() { return $this->belongsTo(Dimension::class); }
    public function options() { return $this->hasMany(Option::class); }
}