<?php

namespace App\Business\Features\Categories\Commands\CreateCategoryCommand;

use App\Models\Category;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateCategoryCommand
{
    private GetDomainService $getDomainService;

    public function __construct(GetDomainService $getDomainService)
    {
        $this->getDomainService = $getDomainService;
    }

    public function handle(CreateCategoryCommandRequest $request): array
    {
        // Enforce limit
        $limit = config('business_limits.limits.categories', 30);
        if (Category::count() >= $limit) {
            throw new HttpException(403, "Maximum limit of {$limit} categories reached.");
        }

        // Fetch domain info
        $domainInfo = $this->getDomainService->handle($request->request_domain);
        if (!$domainInfo) {
             throw new HttpException(404, "Domain information not found.");
        }

        $category = Category::create([
            'name_en' => $request->name_en,
            'name_tr' => $request->name_tr,
            'slug' => $request->slug,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
        ]);

        return [
            'message' => 'Category created successfully',
            'data' => $category,
        ];
    }
}
