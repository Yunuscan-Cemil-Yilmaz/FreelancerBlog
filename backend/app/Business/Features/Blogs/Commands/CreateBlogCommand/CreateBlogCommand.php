<?php

namespace App\Business\Features\Blogs\Commands\CreateBlogCommand;

use App\Models\Blog;
use App\Business\Features\Domain\Services\GetDomainService\GetDomainService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateBlogCommand
{
    private GetDomainService $getDomainService;

    public function __construct(GetDomainService $getDomainService)
    {
        $this->getDomainService = $getDomainService;
    }

    public function handle(CreateBlogCommandRequest $request): array
    {
        $domainInfo = $this->getDomainService->handle(app(\App\Business\Extentions\CurrentDomain\CurrentDomain::class)->get());
        if (!$domainInfo) {
            throw new HttpException(404, "Domain information not found.");
        }

        $contentEn = clean($request->content_en);
        $contentTr = clean($request->content_tr);

        $mainImageUrl = null;
        if ($request->main_image) {
            $path = $request->main_image->store('blogs/' . $domainInfo->domain, 'public');
            $mainImageUrl = url(\Illuminate\Support\Facades\Storage::url($path));
        }

        $galleryUrls = [];
        if ($request->gallery_images) {
            foreach ($request->gallery_images as $file) {
                if ($file) {
                    $path = $file->store('blogs/' . $domainInfo->domain, 'public');
                    $galleryUrls[] = url(\Illuminate\Support\Facades\Storage::url($path));
                }
            }
        }

        $blog = Blog::create([
            'title_en' => $request->title_en,
            'title_tr' => $request->title_tr,
            'slug_en' => $request->slug_en,
            'slug_tr' => $request->slug_tr,
            'content_en' => $contentEn,
            'content_tr' => $contentTr,
            'excerpt_en' => $request->excerpt_en,
            'excerpt_tr' => $request->excerpt_tr,
            'image_url' => $mainImageUrl,
            'images' => $galleryUrls,
            'author' => $request->author,
            'read_time' => $request->read_time,
            'tags' => $request->tags,
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'view_count' => 0,
            'domain' => $domainInfo->domain,
            'admin_domain' => $domainInfo->admin_domain,
        ]);

        return [
            'message' => 'Blog created successfully',
            'data' => $blog,
        ];
    }


}
