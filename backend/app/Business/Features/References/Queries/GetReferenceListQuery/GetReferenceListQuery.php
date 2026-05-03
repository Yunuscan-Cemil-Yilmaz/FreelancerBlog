<?php

namespace App\Business\Features\References\Queries\GetReferenceListQuery;

use App\Models\Reference;

class GetReferenceListQuery
{
    public function handle(GetReferenceListRequest $request): array
    {
        $lang = $request->lang;
        
        $references = Reference::orderBy('order')->get();

        return [
            'data' => $references->map(function (Reference $ref) use ($lang) {
                return [
                    'id' => $ref->id,
                    'name' => $ref->name,
                    'role' => $lang === 'en' ? $ref->role_en : $ref->role_tr,
                    'company' => $ref->company,
                    'quote' => $lang === 'en' ? $ref->quote_en : $ref->quote_tr,
                    'order' => $ref->order,
                    'details' => [
                        'name' => $ref->name,
                        'role_en' => $ref->role_en,
                        'role_tr' => $ref->role_tr,
                        'company' => $ref->company,
                        'quote_en' => $ref->quote_en,
                        'quote_tr' => $ref->quote_tr,
                    ]
                ];
            })
        ];
    }
}
