<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\SkillLevel;

use App\Models\Scopes\DomainScope;

class ProfessionalSkill extends Model
{
    protected $fillable = [
        'name_en',
        'name_tr',
        'icon',
        'level',
        'order',
        'domain',
        'admin_domain'
    ];


    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }

    protected function casts()
    {
        return [
            'level' => SkillLevel::class,
            'created_at' => 'datetime',
            'updated_at' => 'datetime'
        ];
    }
}
