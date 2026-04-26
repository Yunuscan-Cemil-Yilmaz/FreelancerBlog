<?php

namespace App\Business\Features\Domain\Services\GetDomainService;

use App\Models\Domain;

class GetDomainService
{
    public function handle($domain)
    {
        return Domain::select('domain', 'admin_domain')->where('domain', $domain)->orWhere('admin_domain', $domain)->first();
    }
}