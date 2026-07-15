<?php
$appDir = __DIR__ . "/app";

$dirs = [
    "Actions", "Services", "Repositories/Interfaces", "DTOs", 
    "Policies", "Events", "Jobs", "Notifications", 
    "Exports", "Imports", "Helpers", "Traits", "Rules"
];

foreach ($dirs as $dir) {
    if (!is_dir("$appDir/$dir")) {
        mkdir("$appDir/$dir", 0755, true);
    }
}

// 1. Create ApiResponseTrait
$apiResponseTrait = <<<PHP
<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponseTrait
{
    protected function successResponse(\$data, string \$message = null, int \$code = 200): JsonResponse
    {
        return response()->json([
            "status" => "Success",
            "message" => \$message,
            "data" => \$data
        ], \$code);
    }

    protected function errorResponse(string \$message, int \$code): JsonResponse
    {
        return response()->json([
            "status" => "Error",
            "message" => \$message,
            "data" => null
        ], \$code);
    }
}
PHP;
file_put_contents("$appDir/Traits/ApiResponseTrait.php", $apiResponseTrait);

// 2. Base Repository Interface & Class
$baseRepoInterface = <<<PHP
<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

interface BaseRepositoryInterface
{
    public function all(): Collection;
    public function find(string|int \$id): ?Model;
    public function create(array \$attributes): Model;
    public function update(string|int \$id, array \$attributes): bool;
    public function delete(string|int \$id): bool;
}
PHP;
file_put_contents("$appDir/Repositories/Interfaces/BaseRepositoryInterface.php", $baseRepoInterface);

$baseRepoClass = <<<PHP
<?php

namespace App\Repositories;

use App\Repositories\Interfaces\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected Model \$model;

    public function __construct(Model \$model)
    {
        \$this->model = \$model;
    }

    public function all(): Collection
    {
        return \$this->model->all();
    }

    public function find(string|int \$id): ?Model
    {
        return \$this->model->find(\$id);
    }

    public function create(array \$attributes): Model
    {
        return \$this->model->create(\$attributes);
    }

    public function update(string|int \$id, array \$attributes): bool
    {
        \$record = \$this->find(\$id);
        return \$record ? \$record->update(\$attributes) : false;
    }

    public function delete(string|int \$id): bool
    {
        \$record = \$this->find(\$id);
        return \$record ? \$record->delete() : false;
    }
}
PHP;
file_put_contents("$appDir/Repositories/BaseRepository.php", $baseRepoClass);

// 3. Generate Domain Repositories and Interfaces
$domains = ["Company", "Project", "Questionnaire", "Question", "Respondent", "Response", "User", "Setting"];

foreach (\$domains as \$domain) {
    \$interfaceCode = <<<PHP
<?php

namespace App\Repositories\Interfaces;

interface {\$domain}RepositoryInterface extends BaseRepositoryInterface
{
    // Add specific methods for \$domain here
}
PHP;
    file_put_contents("\$appDir/Repositories/Interfaces/{\$domain}RepositoryInterface.php", \$interfaceCode);

    \$repoCode = <<<PHP
<?php

namespace App\Repositories;

use App\Models\\\$domain;
use App\Repositories\Interfaces\\{\$domain}RepositoryInterface;

class {\$domain}Repository extends BaseRepository implements {\$domain}RepositoryInterface
{
    public function __construct({\$domain} \$model)
    {
        parent::__construct(\$model);
    }
}
PHP;
    file_put_contents("\$appDir/Repositories/{\$domain}Repository.php", \$repoCode);
}

// 4. Generate Domain Services
$services = array_merge(\$domains, ["Auth", "ScoringEngine", "Analytics", "Report"]);
foreach (\$services as \$service) {
    \$serviceCode = <<<PHP
<?php

namespace App\Services;

class {\$service}Service
{
    public function __construct()
    {
        // Inject repositories or other dependencies here
    }
}
PHP;
    file_put_contents("\$appDir/Services/{\$service}Service.php", \$serviceCode);
}

echo "Architecture scaffolded successfully!";

