<?php

namespace App\Business\Features\Blogs\Queries\GetBlogListWithPaginationQuery;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class GetBlogListWithPaginationValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'lang' => 'required|string|in:en,tr',
            'category_id' => 'nullable|integer',
            'sub_category_id' => 'nullable|integer',
            'sort' => 'nullable|string|in:newest,oldest,popular',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
