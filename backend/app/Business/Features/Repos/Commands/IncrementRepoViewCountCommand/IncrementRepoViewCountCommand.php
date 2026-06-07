<?php

namespace App\Business\Features\Repos\Commands\IncrementRepoViewCountCommand;

use App\Models\Repo;
use Illuminate\Support\Facades\Cache;

class IncrementRepoViewCountCommand
{
    public function handle(IncrementRepoViewCountRequest $request): array
    {
        $repo = Repo::findOrFail($request->id);
        
        $cacheKey = 'repo_view_' . $request->id . '_' . md5($request->ip . $request->userAgent);
        
        if (!Cache::has($cacheKey)) {
            $repo->increment('view_count');
            Cache::put($cacheKey, true, now()->addMinutes(15));
        }

        return ['viewCount' => $repo->view_count];
    }
}
