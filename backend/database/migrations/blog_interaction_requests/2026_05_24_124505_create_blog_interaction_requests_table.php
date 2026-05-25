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
        Schema::create('blog_interaction_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_id')->constrained('blogs')->onDelete('cascade');
            $table->string('name')->nullable(false);
            $table->string('email')->nullable(true);
            $table->string('phone')->nullable(true);
            $table->string('interaction_type')->nullable(false);
            $table->text('title');
            $table->text('message');
            $table->string('preferred_contact_time')->nullable(true);
            $table->string('ip_address');
            $table->text('user_agent');
            $table->boolean('kvkk_approved')->default(0);
            $table->boolean('is_readed')->default(0);
            $table->boolean('is_handled')->default(0);
            $table->boolean('is_completed')->default(0);
            $table->text('admin_note')->nullable(true);
            
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
        Schema::dropIfExists('blog_interaction_requests');
    }
};
