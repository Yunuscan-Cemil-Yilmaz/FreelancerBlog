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
        Schema::create('moderator_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('moderator_id')->constrained()->cascadeOnDelete();
            $table->string('token');
            $table->string('domain');
            $table->string('admin_domain');
            $table->timestamp('created_at');
            $table->timestamp('expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moderator_tokens');
    }
};
