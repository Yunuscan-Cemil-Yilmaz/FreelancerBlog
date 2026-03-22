<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Scopes\DomainScope;

class Reference extends Model
{
    protected $fillable = [
        'name',
        'role_en',
        'role_tr',
        'company',
        'quote_en',
        'quote_tr',
        'domain',
        'admin_domain'
    ];

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }

    protected function casts() {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime'
        ];
    }
}
