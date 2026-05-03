<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubCategory extends Model
{
    protected $fillable = [
        'category_id',
        'name_en',
        'name_tr',
        'slug',
        'order',
        'domain',
        'admin_domain',
    ];

    protected function casts(): array
    {
        return [
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
}
