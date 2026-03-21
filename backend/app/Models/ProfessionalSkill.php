<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\SkillLevel;

class ProfessionalSkill extends Model
{
    protected $fillable = [
        'name_en',
        'name_tr',
        'icon',
        'level',
        'domain',
        'admin_domain'
    ];

    protected function casts()
    {
        return [
            'level' => SkillLevel::class,
            'created_at' => 'datetime',
            'updated_at' => 'datetime'
        ];
    }
}
