<?php

namespace App\Business\Features\Domain\Commands\CascadeUpdateDomainCommand;

use Infrastructure\Extensions\BaseValidator;

class CascadeUpdateDomainCommandValidator extends BaseValidator
{
    public function validate($request)
    {
        $this->executeValidation([
            'id' => $request->id,
            'domain' => $request->domain,
            'admin_domain' => $request->admin_domain,
        ], [
            'id' => 'required|integer|exists:domains,id',
            'domain' => 'required|string|max:64|unique:domains,domain,'.$request->id,
            'admin_domain' => 'required|string|max:64|unique:domains,admin_domain,'.$request->id,
        ]);
    }
}