<?php

namespace App\Http\Controllers;

use App\Business\Features\Skills\Commands\UpdateSkillOrderCommand\UpdateSkillOrderCommand;
use App\Business\Features\Skills\Commands\UpdateSkillOrderCommand\UpdateSkillOrderCommandRequest;
use App\Business\Features\Skills\Commands\UpdateSkillOrderCommand\UpdateSkillOrderCommandValidator;

use App\Business\Features\Skills\Queries\GetSkillListQuery\GetSkillListQuery;
use App\Business\Features\Skills\Queries\GetSkillListQuery\GetSkillListRequest;
use App\Business\Features\Skills\Commands\CreateSkillCommand\CreateSkillCommand;
use App\Business\Features\Skills\Commands\CreateSkillCommand\CreateSkillCommandRequest;
use App\Business\Features\Skills\Commands\CreateSkillCommand\CreateSkillCommandValidator;
use App\Business\Features\Skills\Commands\UpdateSkillCommand\UpdateSkillCommand;
use App\Business\Features\Skills\Commands\UpdateSkillCommand\UpdateSkillCommandRequest;
use App\Business\Features\Skills\Commands\UpdateSkillCommand\UpdateSkillCommandValidator;
use App\Business\Features\Skills\Commands\DeleteSkillCommand\DeleteSkillCommand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index(string $lang, GetSkillListQuery $query): JsonResponse
    {
        $request = new GetSkillListRequest($lang);
        $result = $query->handle($request);

        return response()->json($result);
    }

    public function createSkill(Request $request, CreateSkillCommand $command, CreateSkillCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $createRequest = new CreateSkillCommandRequest(
            category_en: $request->input('category_en'),
            category_tr: $request->input('category_tr'),
            items: $request->input('items'),
            request_domain: $request->header('domain') ?? $request->input('domain')
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateSkill(Request $request, UpdateSkillCommand $command, UpdateSkillCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $updateRequest = new UpdateSkillCommandRequest(
            id: (int) $request->input('id'),
            category_en: $request->input('category_en'),
            category_tr: $request->input('category_tr'),
            items: $request->input('items'),
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteSkill(Request $request, DeleteSkillCommand $command): JsonResponse
    {
        $id = (int) $request->header('id');
        return response()->json($command->handle($id));
    }
    public function updateSkillOrder(Request $request, UpdateSkillOrderCommand $command, UpdateSkillOrderCommandValidator $validator): \Illuminate\Http\JsonResponse
    {
        $validator->validate($request->all());
        $updateRequest = new UpdateSkillOrderCommandRequest(
            orders: $request->input('orders')
        );
        return response()->json($command->handle($updateRequest));
    }
}