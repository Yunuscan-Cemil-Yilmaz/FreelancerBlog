<?php

namespace App\Business\Features\Repos\Commands\UpdateRepoCommand;

use App\Models\Repo;
use Illuminate\Support\Facades\Storage;

class UpdateRepoCommand
{
    public function handle(UpdateRepoCommandRequest $request): array
    {
        $repo = Repo::findOrFail($request->id);

        $mainImageUrl = $repo->image_url;
        if ($request->delete_main_image) {
            $mainImageUrl = null;
        }
        if ($request->main_image) {
            $path = $request->main_image->store('repos/' . $repo->domain, 'public');
            $mainImageUrl = url(Storage::url($path));
        }

        $galleryUrls = $request->existing_gallery_images ?? [];
        if ($request->gallery_images) {
            foreach ($request->gallery_images as $file) {
                if ($file) {
                    $path = $file->store('repos/' . $repo->domain, 'public');
                    $galleryUrls[] = url(Storage::url($path));
                }
            }
        }

        $repo->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'description_en' => $request->description_en,
            'description_tr' => $request->description_tr,
            'image_url' => $mainImageUrl,
            'images' => $galleryUrls,
            'project_url' => $request->project_url,
            'repo_url' => $request->repo_url,
            'is_public' => $request->is_public,
            'tech_stack' => $request->tech_stack
        ]);

        return [
            'success' => true,
            'message' => 'Repo updated successfully',
            'data' => $repo
        ];
    }
}
