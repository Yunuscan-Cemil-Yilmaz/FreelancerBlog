<?php

namespace App\Models\Scopes;

use App\Support\CurrentDomain;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class DomainScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        $domain = app(CurrentDomain::class)->get();

        if (!$domain) {
            return;
        }

        $builder->where(function ($query) use ($domain) {
            $query->where('domain', $domain)
                  ->orWhere('admin_domain', $domain);
        });
    }
}
