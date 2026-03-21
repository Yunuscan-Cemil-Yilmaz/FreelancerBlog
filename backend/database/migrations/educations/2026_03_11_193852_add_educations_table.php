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
        Schema::create("educations", function (Blueprint $table) {
            $table->id();
            $table->string("year_en");
            $table->string("year_tr");
            $table->string("degree_en");
            $table->string("degree_tr");
            $table->string("school_en");
            $table->string("school_tr");
            $table->text("description_en");
            $table->text("description_tr");
            $table->string("domain");
            $table->string("admin_domain");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("educations");
    }
};
