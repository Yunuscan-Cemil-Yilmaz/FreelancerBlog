<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repo_interaction_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('interaction_id')->constrained('repo_interaction_requests')->onDelete('cascade');
            $table->text('interaction_note');
            $table->string('domain');
            $table->string('admin_domain');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repo_interaction_details');
    }
};
