<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blog extends Model
{
    protected $fillable = [
        'title_en',
        'title_tr',
        'slug_en',
        'slug_tr',
        'content_en',
        'content_tr',
        'excerpt_en',
        'excerpt_tr',
        'image_url',
        'images',
        'author',
        'read_time',
        'tags',
        'view_count',
        'category_id',
        'sub_category_id',
        'domain',
        'admin_domain',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'tags' => 'array',
            'view_count' => 'integer',
            'read_time' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class);
    }
}
