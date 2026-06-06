<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepoInteractionDetail extends Model
{
    protected $fillable = [
        'interaction_id',
        'interaction_note',
        'domain',
        'admin_domain',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }

    public function interactionRequest(): BelongsTo
    {
        return $this->belongsTo(RepoInteractionRequest::class, 'interaction_id');
    }
}
