<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('blog_interaction_details', 'blog_id')) {
            Schema::table('blog_interaction_details', function (Blueprint $table) {
                $table->dropForeign(['blog_id']);
                $table->dropColumn('blog_id');
            });
        }

        if (Schema::hasColumn('repo_interaction_details', 'repo_id')) {
            Schema::table('repo_interaction_details', function (Blueprint $table) {
                $table->dropForeign(['repo_id']);
                $table->dropColumn('repo_id');
            });
        }
    }

    public function down(): void
    {
        Schema::table('blog_interaction_details', function (Blueprint $table) {
            $table->foreignId('blog_id')->nullable()->constrained('blogs')->onDelete('cascade');
        });

        Schema::table('repo_interaction_details', function (Blueprint $table) {
            $table->foreignId('repo_id')->nullable()->constrained('repos')->onDelete('cascade');
        });
    }
};
