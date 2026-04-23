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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            
            // Sosyal Login Alanları
            $table->string('provider')->nullable();    // örn: google
            $table->string('provider_id')->nullable(); // örn: 1029384756
            $table->string('avatar')->nullable();      // Profil resmi
            
            // Senin mimarin için gerekli olan domain kolonları
            $table->string('domain')->nullable();
            $table->string('admin_domain')->nullable();

            $table->rememberToken(); // Hatırla beni için (Session guard kullanacaksan)
            $table->timestamps();
            
            // Aynı provider ve provider_id kombinasyonu unique olmalı
            $table->unique(['provider', 'provider_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
