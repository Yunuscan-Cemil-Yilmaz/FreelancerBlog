<?php

namespace App\Business\Features\Domain\Commands\UpdateDomainCommand;

class UpdateDomainCommandValidator
{
    public function validate($request)
    {
        return $request->validate([
            'id' => 'required|integer|exists:domains,id',
            'domain' => 'required|string|max:64|unique:domains,domain,'.$request->id,
            'admin_domain' => 'required|string|max:64|unique:domains,admin_domain,'.$request->id,
        ]);
    }
}