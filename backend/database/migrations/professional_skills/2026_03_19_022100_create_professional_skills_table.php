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
        Schema::create('professional_skills', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('name_tr');
            $table->string('icon', 16)->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->enum('level', ['core', 'strong', 'familiar']);
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
        Schema::dropIfExists('professional_skills');
    }
};
