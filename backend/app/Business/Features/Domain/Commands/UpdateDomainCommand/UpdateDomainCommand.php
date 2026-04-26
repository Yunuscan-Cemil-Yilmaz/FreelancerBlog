<?php

namespace App\Business\Features\Domain\Commands\UpdateDomainCommand;

use App\Models\Domain;

class UpdateDomainCommand
{
    public function handle(UpdateDomainCommandRequest $request)
    {
        $validator = new UpdateDomainCommandValidator();
        $validator->validate($request);

        $domain = Domain::find($request->id);
        $domain->update([
            'domain' => $request->domain,
            'admin_domain' => $request->admin_domain,
        ]);

        return new UpdateDomainCommandResponse(
            id: $domain->id,
            domain: $domain->domain,
            admin_domain: $domain->admin_domain
        );
    }
}