<?php

namespace App\Business\Features\Repos\Commands\CreateRepoCommand;

use App\Models\Repo;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Storage;

class CreateRepoCommand
{
    public function __construct(private GetDomainService $getDomainService) {}

    public function handle(CreateRepoCommandRequest $request): array
    {
        $domainInfo = $this->getDomainService->handle(app(\App\Business\Extentions\CurrentDomain\CurrentDomain::class)->get());
        if (!$domainInfo) {
            throw new HttpException(404, "Domain information not found.");
        }

        $mainImageUrl = null;
        if ($request->main_image) {
            $path = $request->main_image->store('repos/' . $domainInfo->domain, 'public');
            $mainImageUrl = url(Storage::url($path));
        }

        $galleryUrls = [];
        if ($request->gallery_images) {
            foreach ($request->gallery_images as $file) {
                if ($file) {
                    $path = $file->store('repos/' . $domainInfo->domain, 'public');
                    $galleryUrls[] = url(Storage::url($path));
                }
            }
        }

        $repo = Repo::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'description_en' => $request->description_en,
            'description_tr' => $request->description_tr,
            'image_url' => $mainImageUrl,
            'images' => $galleryUrls,
            'project_url' => $request->project_url,
            'repo_url' => $request->repo_url,
            'is_public' => $request->is_public,
            'tech_stack' => $request->tech_stack,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
            'view_count' => 0
        ]);

        return [
            'success' => true,
            'message' => 'Repo created successfully',
            'data' => $repo
        ];
    }
}
