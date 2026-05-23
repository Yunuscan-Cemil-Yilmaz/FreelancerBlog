<?php

namespace App\Business\Features\References\Queries\GetReferenceAllListQuery;

use App\Models\UserReference;

class GetReferenceAllListQuery
{
    public function handle(): array
    {
        $references = UserReference::orderBy('order')->get();

        $data = $references->map(function (UserReference $ref) {
            return [
                'id' => $ref->id,
                'name' => $ref->name,
                'role_en' => $ref->role_en,
                'role_tr' => $ref->role_tr,
                'company' => $ref->company,
                'quote_en' => $ref->quote_en,
                'quote_tr' => $ref->quote_tr,
                'order' => $ref->order,
            ];
        });

        return ['data' => $data];
    }
}
