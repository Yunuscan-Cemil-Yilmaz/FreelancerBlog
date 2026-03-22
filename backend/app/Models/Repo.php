<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;

class Repo extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description_en',
        'description_tr',
        'image_url',
        'images',
        'project_url',
        'repo_url',
        'is_public',
        'tech_stack',
        'view_count',
        'domain',
        'admin_domain',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'tech_stack' => 'array',
            'is_public' => 'boolean',
            'view_count' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }
}
