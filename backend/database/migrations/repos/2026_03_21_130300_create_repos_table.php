<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('description_en');
            $table->longText('description_tr');
            $table->string('image_url')->nullable();
            $table->json('images')->nullable();
            $table->string('project_url')->nullable();
            $table->string('repo_url')->nullable();
            $table->boolean('is_public')->default(true);
            $table->json('tech_stack')->nullable();
            $table->integer('view_count')->default(0);
            $table->string('domain')->nullable();
            $table->string('admin_domain')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repos');
    }
};
