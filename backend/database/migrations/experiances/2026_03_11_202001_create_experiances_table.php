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
        Schema::create('experiances', function (Blueprint $table) {
            $table->id();
            $table->string('year_en');
            $table->string('yaer_tr');
            $table->string('role_en');
            $table->string('role_tr');
            $table->string('company_en');
            $table->string('company_tr');
            $table->text('description_en');
            $table->text('description_tr');
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
        Schema::dropIfExists('experiances');
    }
};
