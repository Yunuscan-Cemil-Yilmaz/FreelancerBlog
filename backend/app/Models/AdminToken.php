<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminToken extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'admin_id',
        'token',
        'created_at',
        'expires_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->created_at = now();
            $model->expires_at = now()->addMinutes((int) env('ADMIN_TOKEN_EXPIRE_TIME', 60));
        });
    }

    public function admin()
    {
        return $this->belongsTo(\App\Models\Admin::class);
    }
}
