<?php

namespace App\Business\Features\References\Commands\CreateReferenceCommand;

use App\Models\Reference;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateReferenceCommand
{
    private GetDomainService $getDomainService;

    public function __construct(GetDomainService $getDomainService)
    {
        $this->getDomainService = $getDomainService;
    }

    public function handle(CreateReferenceCommandRequest $request): array
    {
        // Enforce limit
        $limit = config('business_limits.limits.references', 30);
        if (Reference::count() >= $limit) {
            throw new HttpException(403, "Maximum limit of {$limit} references reached.");
        }

        // Fetch domain info
        $domainInfo = $this->getDomainService->handle($request->request_domain);
        if (!$domainInfo) {
             throw new HttpException(404, "Domain information not found.");
        }

        $reference = Reference::create([
            'name' => $request->name,
            'role_en' => $request->role_en,
            'role_tr' => $request->role_tr,
            'company' => $request->company,
            'quote_en' => $request->quote_en,
            'quote_tr' => $request->quote_tr,
            'order' => (\App\Models\Reference::max('order') ?? 0) + 1,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
        ]);

        return [
            'message' => 'Reference created successfully',
            'data' => $reference,
        ];
    }
}
