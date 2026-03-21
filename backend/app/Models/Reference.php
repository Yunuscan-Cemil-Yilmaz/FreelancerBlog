<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    protected $fillable = [
        'name',
        'role_en',
        'role_tr',
        'company',
        'quote_en',
        'quote_tr'
    ];

    protected function casts() {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime'
        ];
    }
}
