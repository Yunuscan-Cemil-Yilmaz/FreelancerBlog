<?php

namespace App\Business\Features\Blogs\Commands\UpdateBlogCommand;

use App\Models\Blog;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UpdateBlogCommand
{
    public function handle(UpdateBlogCommandRequest $request): array
    {
        $blog = Blog::find($request->id);

        if (!$blog) {
            throw new HttpException(404, "Blog not found");
        }

        $contentEn = $this->sanitize($request->content_en);
        $contentTr = $this->sanitize($request->content_tr);

        $mainImageUrl = $blog->image_url;
        if ($request->delete_main_image) {
            $mainImageUrl = null;
        }
        if ($request->main_image) {
            $path = $request->main_image->store('blogs/' . $blog->domain, 'public');
            $mainImageUrl = url(\Illuminate\Support\Facades\Storage::url($path));
        }

        $galleryUrls = $request->existing_gallery_images ?? [];
        if ($request->gallery_images) {
            foreach ($request->gallery_images as $file) {
                if ($file) {
                    $path = $file->store('blogs/' . $blog->domain, 'public');
                    $galleryUrls[] = url(\Illuminate\Support\Facades\Storage::url($path));
                }
            }
        }

        $blog->update([
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
        ]);

        return [
            'message' => 'Blog updated successfully',
            'data' => $blog,
        ];
    }

    private function sanitize(string $html): string
    {
        // Simple XSS prevention
        $html = preg_replace('/<(script|iframe|object|embed|applet|meta|link|style|base|form)[^>]*>.*?<\/\1>/is', '', $html);
        $html = preg_replace('/<(script|iframe|object|embed|applet|meta|link|style|base|form)[^>]*>/is', '', $html);
        $html = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*?>#iUu', "$1>", $html);
        return $html;
    }
}
