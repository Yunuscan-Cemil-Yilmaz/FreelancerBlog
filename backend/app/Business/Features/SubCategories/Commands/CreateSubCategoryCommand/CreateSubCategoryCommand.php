<?php

namespace App\Business\Features\SubCategories\Commands\CreateSubCategoryCommand;

use App\Models\SubCategory;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateSubCategoryCommand
{
    private GetDomainService $getDomainService;

    public function __construct(GetDomainService $getDomainService)
    {
        $this->getDomainService = $getDomainService;
    }

    public function handle(CreateSubCategoryCommandRequest $request): array
    {
        // Enforce limit
        $limit = config('business_limits.limits.sub_categories', 30);
        if (SubCategory::count() >= $limit) {
            throw new HttpException(403, "Maximum limit of {$limit} sub-categories reached.");
        }

        // Fetch domain info
        $domainInfo = $this->getDomainService->handle($request->request_domain);
        if (!$domainInfo) {
             throw new HttpException(404, "Domain information not found.");
        }

        $subCategory = SubCategory::create([
            'category_id' => $request->category_id,
            'name_en' => $request->name_en,
            'name_tr' => $request->name_tr,
            'slug' => $request->slug,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
        ]);

        return [
            'message' => 'SubCategory created successfully',
            'data' => $subCategory,
        ];
    }
}
