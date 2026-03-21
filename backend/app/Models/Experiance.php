<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;

class Experiance extends Model
{
    protected $fillable = [
        'year_en',
        'year_tr',
        'role_en',
        'role_tr',
        'company_en',
        'company_tr',
        'description_en',
        'description_tr',
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
}