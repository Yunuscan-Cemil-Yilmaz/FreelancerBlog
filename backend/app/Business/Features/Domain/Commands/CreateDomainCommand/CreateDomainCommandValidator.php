<?php

namespace App\Business\Features\Domain\Commands\CreateDomainCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateDomainCommandValidator extends BaseValidator
{
    public function validate($request)
    {
        $this->executeValidation([
            'domain' => $request->domain,
            'admin_domain' => $request->admin_domain,
        ], [
            'domain' => 'required|string|max:64|unique:domains,domain',
            'admin_domain' => 'required|string|max:64|unique:domains,admin_domain',
        ]);
    }
}