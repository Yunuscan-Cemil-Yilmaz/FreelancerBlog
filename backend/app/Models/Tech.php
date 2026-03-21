<?php

namespace App\Models;

use App\Enums\SkillLevel;
use Illuminate\Database\Eloquent\Model;

class Tech extends Model
{
    protected $fillable = [
        'category_en',
        'category_tr',
        'items'
    ];

    protected function casts() {
        return [
            'items' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime'
        ];
    }

    public function getItemsAttribute()
    {
        return collect($this->items)->map(function ($item){
            return (object) [
                'name' => $item['name'],
                'level' => SkillLevel::from($item['level'])->value
            ];
        });
    }
}
