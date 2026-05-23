<?php

namespace App\Models;

use App\Enums\SkillLevel;
use Illuminate\Database\Eloquent\Model;

use App\Models\Scopes\DomainScope;

class Tech extends Model
{
    protected $table = 'teches';

    protected $fillable = [
        'category_en',
        'category_tr',
        'items',
        'order',
        'domain',
        'admin_domain'
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }

    protected function casts() {
        return [
            'items' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime'
        ];
    }

    public function getItemsAttribute($value)
    {
        $items = is_string($value) ? json_decode($value, true) : $value;
        return collect($items)->map(function ($item){
            return (object) [
                'name' => $item['name'] ?? '',
                'level' => isset($item['level']) ? SkillLevel::tryFrom($item['level'])?->value ?? $item['level'] : ''
            ];
        });
    }
}
