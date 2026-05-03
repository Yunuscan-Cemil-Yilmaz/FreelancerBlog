<?php

namespace App\Business\Features\Skills\Commands\CreateSkillCommand;

use App\Models\Tech;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateSkillCommand
{
    private GetDomainService $getDomainService;

    public function __construct(GetDomainService $getDomainService)
    {
        $this->getDomainService = $getDomainService;
    }

    public function handle(CreateSkillCommandRequest $request): array
    {
        // Enforce limit
        $limit = config('business_limits.limits.techs', 30);
        if (Tech::count() >= $limit) {
            throw new HttpException(403, "Maximum limit of {$limit} skills reached.");
        }

        // Fetch domain info
        $domainInfo = $this->getDomainService->handle($request->request_domain);
        if (!$domainInfo) {
             throw new HttpException(404, "Domain information not found.");
        }

        $skill = Tech::create([
            'category_en' => $request->category_en,
            'category_tr' => $request->category_tr,
            'items' => $request->items,
            'order' => (\App\Models\Tech::max('order') ?? 0) + 1,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
        ]);

        return [
            'message' => 'Skill created successfully',
            'data' => $skill,
        ];
    }
}
