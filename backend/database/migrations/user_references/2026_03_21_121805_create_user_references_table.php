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
        Schema::create('user_references', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role_en');
            $table->string('role_tr');
            $table->string('company');
            $table->text('quote_en');
            $table->text('quote_tr');
            $table->string('domain')->nullable();
            $table->string('admin_domain')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('references'); // Kept to allow rollback of the old table
        Schema::dropIfExists('user_references');
    }
};
