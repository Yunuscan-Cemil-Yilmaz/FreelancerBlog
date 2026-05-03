<?php

namespace App\Http\Controllers;

use App\Business\Features\Repos\Queries\GetRepoBySlugQuery\GetRepoBySlugQuery;
use App\Business\Features\Repos\Queries\GetRepoBySlugQuery\GetRepoBySlugRequest;
use App\Business\Features\Repos\Queries\GetRepoListWithPaginationQuery\GetRepoListWithPaginationQuery;
use App\Business\Features\Repos\Queries\GetRepoListWithPaginationQuery\GetRepoListWithPaginationRequest;
use App\Business\Features\Repos\Commands\IncrementRepoViewCountCommand\IncrementRepoViewCountCommand;
use App\Business\Features\Repos\Commands\IncrementRepoViewCountCommand\IncrementRepoViewCountRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RepoController extends Controller
{
    public function index(Request $request, string $lang, GetRepoListWithPaginationQuery $query): JsonResponse
    {
        $repoRequest = new GetRepoListWithPaginationRequest(
            lang: $lang,
            sort: $request->input('sort', 'newest'),
            perPage: $request->integer('per_page', 12),
            page: $request->integer('page', 1)
        );

        $response = $query->handle($repoRequest);

        return response()->json([
            'data' => $response->items,
            'meta' => $response->meta,
        ]);
    }

    public function show(string $lang, string $slug, GetRepoBySlugQuery $query): JsonResponse
    {
        $repoRequest = new GetRepoBySlugRequest($lang, $slug);
        $result = $query->handle($repoRequest);

        return response()->json($result);
    }

    public function incrementViewCount(int $id, IncrementRepoViewCountCommand $command): JsonResponse
    {
        $viewRequest = new IncrementRepoViewCountRequest($id);
        $result = $command->handle($viewRequest);

        return response()->json($result);
    }
}
