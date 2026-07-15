<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('company_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('status')->default('draft'); // draft, active, archived
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('questionnaires', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('project_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('dimensions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('questionnaire_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('weight', 8, 4)->default(1.0);
            $table->timestamps();
        });

        Schema::create('questions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('dimension_id')->constrained()->cascadeOnDelete();
            $table->text('text');
            $table->string('type')->default('multiple_choice'); // multiple_choice, likert, text
            $table->boolean('is_required')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('options', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('question_id')->constrained()->cascadeOnDelete();
            $table->string('text');
            $table->decimal('score_value', 8, 2)->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('respondents', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('project_id')->constrained()->cascadeOnDelete();
            $table->string('email')->nullable();
            $table->json('demographic_data')->nullable(); // For dynamic dept, age, etc.
            $table->boolean('is_anonymous')->default(false);
            $table->timestamps();

            // Indexing for analytics
            $table->index(['project_id', 'is_anonymous']);
        });

        Schema::create('responses', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('respondent_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('questionnaire_id')->constrained()->cascadeOnDelete();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->decimal('total_score', 8, 2)->nullable();
            $table->timestamps();

            // Indexing for analytics filtering by completion date
            $table->index(['questionnaire_id', 'completed_at']);
        });

        Schema::create('response_answers', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('response_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('question_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('option_id')->nullable()->constrained('options')->nullOnDelete();
            $table->text('text_value')->nullable();
            $table->decimal('score', 8, 2)->nullable();
            $table->timestamps();

            // Index for fast query of a specific question's answer in a response
            $table->index(['response_id', 'question_id']);
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action'); // created, updated, deleted
            $table->string('entity_type');
            $table->ulid('entity_id');
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index(['entity_type', 'entity_id']);
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('company_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->json('value');
            $table->string('type')->default('string'); // string, boolean, integer, json
            $table->timestamps();

            $table->unique(['company_id', 'key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('response_answers');
        Schema::dropIfExists('responses');
        Schema::dropIfExists('respondents');
        Schema::dropIfExists('options');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('dimensions');
        Schema::dropIfExists('questionnaires');
        Schema::dropIfExists('projects');
    }
};
