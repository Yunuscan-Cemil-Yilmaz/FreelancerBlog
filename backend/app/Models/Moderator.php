<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Moderator extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'username',
        'password',
        'full_name',
        'domain',
        'admin_domain',
        'is_active',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }
}
