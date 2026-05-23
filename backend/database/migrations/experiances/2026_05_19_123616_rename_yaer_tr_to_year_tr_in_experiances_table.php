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
        if (Schema::hasColumn('experiances', 'yaer_tr')) {
            Schema::table('experiances', function (Blueprint $table) {
                $table->renameColumn('yaer_tr', 'year_tr');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('experiances', 'year_tr')) {
            Schema::table('experiances', function (Blueprint $table) {
                $table->renameColumn('year_tr', 'yaer_tr');
            });
        }
    }
};
