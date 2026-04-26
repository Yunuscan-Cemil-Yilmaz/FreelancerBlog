<?php

namespace App\Business\Features\Domain\Commands\CreateDomainCommand;

use App\Models\Domain;

class CreateDomainCommand
{
    public function handle(CreateDomainCommandRequest $request)
    {
        $validator = new CreateDomainCommandValidator();
        $validator->validate($request);

        $domain = Domain::create([
            'domain' => $request->domain,
            'admin_domain' => $request->admin_domain,
        ]);

        return new CreateDomainCommandResponse($domain->id);
    }
}