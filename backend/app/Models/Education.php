<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'year_en',
        'year_tr',
        'degree_en',
        'degree_tr',
        'school_en',
        'school_tr',
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
