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
        Schema::create('blog_interaction_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('interaction_id')->constrained('blog_interaction_requests')->onDelete('cascade');
            $table->foreignId('blog_id')->constrained('blogs')->onDelete('cascade');
            $table->text('interaction_note');
            $table->unsignedTinyInteger('contact_result');
            
            $table->string('domain');
            $table->string('admin_domain');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_interaction_details');
    }
};
