<?php

namespace Infrastructure\Extensions;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

abstract class BaseValidator
{
    /**
     * Execute validation against given data and rules.
     *
     * @param array $data
     * @param array $rules
     * @param array $messages
     * @param array $customAttributes
     * @throws ValidationException
     */
    protected function executeValidation(array $data, array $rules, array $messages = [], array $customAttributes = []): void
    {
        $validator = Validator::make($data, $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
