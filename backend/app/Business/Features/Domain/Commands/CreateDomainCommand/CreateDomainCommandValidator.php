<?php

namespace App\Business\Features\Domain\Commands\CreateDomainCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateDomainCommandValidator extends BaseValidator
{
    public function validate($request)
    {
        return $request->validate([
            'domain' => 'required|string|max:64|unique:domains,domain,admin_domain',
            'admin_domain' => 'required|string|max:64|unique:domains,admin_domain,domain',
        ]);
    }
}