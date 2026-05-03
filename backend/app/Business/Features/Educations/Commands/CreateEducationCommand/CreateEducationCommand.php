<?php

namespace App\Business\Features\Educations\Commands\CreateEducationCommand;

use App\Models\Education;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateEducationCommand
{
    private GetDomainService $getDomainService;

    public function __construct(GetDomainService $getDomainService)
    {
        $this->getDomainService = $getDomainService;
    }

    public function handle(CreateEducationCommandRequest $request): array
    {
        // Enforce limit
        $limit = config('business_limits.limits.educations', 10);
        if (Education::count() >= $limit) {
            throw new HttpException(403, "Maximum limit of {$limit} educations reached.");
        }

        // Fetch domain info
        $domainInfo = $this->getDomainService->handle($request->request_domain);
        if (!$domainInfo) {
             throw new HttpException(404, "Domain information not found.");
        }

        $education = Education::create([
            'year_en' => $request->year_en,
            'year_tr' => $request->year_tr,
            'degree_en' => $request->degree_en,
            'degree_tr' => $request->degree_tr,
            'school_en' => $request->school_en,
            'school_tr' => $request->school_tr,
            'description_en' => $request->description_en,
            'description_tr' => $request->description_tr,
            'order' => (\App\Models\Education::max('order') ?? 0) + 1,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
        ]);

        return [
            'message' => 'Education created successfully',
            'data' => $education,
        ];
    }
}
