<?php

namespace App\Business\Features\ProfessionalSkills\Commands\CreateProfessionalSkillCommand;

use App\Models\ProfessionalSkill;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateProfessionalSkillCommand
{
    private GetDomainService $getDomainService;

    public function __construct(GetDomainService $getDomainService)
    {
        $this->getDomainService = $getDomainService;
    }

    public function handle(CreateProfessionalSkillCommandRequest $request): array
    {
        // Enforce limit
        $limit = config('business_limits.limits.professional_skills', 30);
        if (ProfessionalSkill::count() >= $limit) {
            throw new HttpException(403, "Maximum limit of {$limit} professional skills reached.");
        }

        // Fetch domain info
        $domainInfo = $this->getDomainService->handle($request->request_domain);
        if (!$domainInfo) {
             throw new HttpException(404, "Domain information not found.");
        }

        $skill = ProfessionalSkill::create([
            'name_en' => $request->name_en,
            'name_tr' => $request->name_tr,
            'icon' => $request->icon,
            'level' => $request->level,
            'order' => (\App\Models\ProfessionalSkill::max('order') ?? 0) + 1,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
        ]);

        return [
            'message' => 'Professional skill created successfully',
            'data' => $skill,
        ];
    }
}
