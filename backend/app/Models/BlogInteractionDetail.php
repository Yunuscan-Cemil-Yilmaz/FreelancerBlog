<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogInteractionDetail extends Model
{
    protected $fillable = [
        'interaction_id',
        'blog_id',
        'interaction_note',
        'contact_result',
        'domain',
        'admin_domain',
    ];

    protected function casts(): array
    {
        return [
            'contact_result' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new DomainScope);
    }

    public function interactionRequest(): BelongsTo
    {
        return $this->belongsTo(BlogInteractionRequest::class, 'interaction_id');
    }

    public function blog(): BelongsTo
    {
        return $this->belongsTo(Blog::class);
    }
}
