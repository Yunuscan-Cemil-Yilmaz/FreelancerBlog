<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InteractionRequest extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'interaction_type',
        'title',
        'message',
        'preferred_contact_time',
        'ip_address',
        'user_agent',
        'kvkk_approved',
        'is_readed',
        'is_handled',
        'is_completed',
        'admin_note',
        'domain',
        'admin_domain',
    ];

    protected function casts(): array
    {
        return [
            'kvkk_approved' => 'boolean',
            'is_readed' => 'boolean',
            'is_handled' => 'boolean',
            'is_completed' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }

    public function details(): HasMany
    {
        return $this->hasMany(InteractionDetail::class, 'interaction_id');
    }
}
