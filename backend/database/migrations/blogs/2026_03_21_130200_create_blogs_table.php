<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_tr');
            $table->string('slug_en')->unique();
            $table->string('slug_tr')->unique();
            $table->longText('content_en');
            $table->longText('content_tr');
            $table->text('excerpt_en');
            $table->text('excerpt_tr');
            $table->string('image_url')->nullable();
            $table->json('images')->nullable();
            $table->string('author');
            $table->integer('read_time')->default(5);
            $table->json('tags')->nullable();
            $table->integer('view_count')->default(0);
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('sub_category_id')->nullable()->constrained('sub_categories')->onDelete('set null');
            $table->string('domain')->nullable();
            $table->string('admin_domain')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
