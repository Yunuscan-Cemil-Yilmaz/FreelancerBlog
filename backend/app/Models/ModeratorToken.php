<?php

namespace App\Models;

use App\Models\Scopes\DomainScope;
use Illuminate\Database\Eloquent\Model;

class ModeratorToken extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'moderator_id',
        'token',
        'domain',
        'admin_domain',
        'created_at',
        'expires_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->created_at = now();
            $model->expires_at = now()->addMinutes((int) env('MODERATOR_TOKEN_EXPIRE_TIME', 60));
        });

        static::addGlobalScope(new DomainScope);
    }

    public function moderator()
    {
        return $this->belongsTo(Moderator::class);
    }
}
