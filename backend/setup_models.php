<?php

$modelsPath = __DIR__ . '/app/Models/';

$models = [
    'Company' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasUlids, SoftDeletes;
    protected \$fillable = ['name', 'domain'];
    public function projects() { return \$this->hasMany(Project::class); }
    public function users() { return \$this->hasMany(User::class); }
}
PHP,

    'Project' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasUlids, SoftDeletes;
    protected \$fillable = ['company_id', 'title', 'description', 'start_date', 'end_date', 'status'];
    public function company() { return \$this->belongsTo(Company::class); }
    public function questionnaires() { return \$this->hasMany(Questionnaire::class); }
    public function respondents() { return \$this->hasMany(Respondent::class); }
}
PHP,

    'Questionnaire' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Questionnaire extends Model
{
    use HasUlids, SoftDeletes;
    protected \$fillable = ['project_id', 'title', 'description', 'is_active'];
    public function project() { return \$this->belongsTo(Project::class); }
    public function dimensions() { return \$this->hasMany(Dimension::class); }
    public function responses() { return \$this->hasMany(Response::class); }
}
PHP,

    'Dimension' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Dimension extends Model
{
    use HasUlids;
    protected \$fillable = ['questionnaire_id', 'name', 'description', 'weight'];
    public function questionnaire() { return \$this->belongsTo(Questionnaire::class); }
    public function questions() { return \$this->hasMany(Question::class); }
}
PHP,

    'Question' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasUlids;
    protected \$fillable = ['dimension_id', 'text', 'type', 'is_required', 'order'];
    public function dimension() { return \$this->belongsTo(Dimension::class); }
    public function options() { return \$this->hasMany(Option::class); }
}
PHP,

    'Option' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasUlids;
    protected \$fillable = ['question_id', 'text', 'score_value', 'order'];
    public function question() { return \$this->belongsTo(Question::class); }
}
PHP,

    'Respondent' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Respondent extends Model
{
    use HasUlids;
    protected \$fillable = ['project_id', 'email', 'demographic_data', 'is_anonymous'];
    protected \$casts = ['demographic_data' => 'array', 'is_anonymous' => 'boolean'];
    public function project() { return \$this->belongsTo(Project::class); }
    public function responses() { return \$this->hasMany(Response::class); }
}
PHP,

    'Response' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasUlids;
    protected \$fillable = ['respondent_id', 'questionnaire_id', 'started_at', 'completed_at', 'total_score'];
    protected \$casts = ['started_at' => 'datetime', 'completed_at' => 'datetime'];
    public function respondent() { return \$this->belongsTo(Respondent::class); }
    public function questionnaire() { return \$this->belongsTo(Questionnaire::class); }
    public function answers() { return \$this->hasMany(ResponseAnswer::class); }
}
PHP,

    'ResponseAnswer' => <<<PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class ResponseAnswer extends Model
{
    use HasUlids;
    protected \$fillable = ['response_id', 'question_id', 'option_id', 'text_value', 'score'];
    public function response() { return \$this->belongsTo(Response::class); }
    public function question() { return \$this->belongsTo(Question::class); }
    public function option() { return \$this->belongsTo(Option::class); }
}
PHP,
];

foreach ($models as $name => $content) {
    file_put_contents($modelsPath . $name . '.php', $content);
}

echo "Models updated successfully.\n";
