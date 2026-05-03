<?php

namespace App\Business\Features\Experiances\Commands\CreateExperianceCommand;

use App\Models\Experiance;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateExperianceCommand
{
    private GetDomainService $getDomainService;

    public function __construct(GetDomainService $getDomainService)
    {
        $this->getDomainService = $getDomainService;
    }

    public function handle(CreateExperianceCommandRequest $request): array
    {
        // Enforce limit
        $limit = config('business_limits.limits.experiances', 30);
        if (Experiance::count() >= $limit) {
            throw new HttpException(403, "Maximum limit of {$limit} experiences reached.");
        }

        // Fetch domain info
        $domainInfo = $this->getDomainService->handle($request->request_domain);
        if (!$domainInfo) {
             throw new HttpException(404, "Domain information not found.");
        }

        $experiance = Experiance::create([
            'year_en' => $request->year_en,
            'year_tr' => $request->year_tr,
            'role_en' => $request->role_en,
            'role_tr' => $request->role_tr,
            'company_en' => $request->company_en,
            'company_tr' => $request->company_tr,
            'description_en' => $request->description_en,
            'description_tr' => $request->description_tr,
            'order' => $request->order,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
        ]);

        return [
            'message' => 'Experience created successfully',
            'data' => $experiance,
        ];
    }
}
