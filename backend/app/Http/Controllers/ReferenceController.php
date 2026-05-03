<?php

namespace App\Http\Controllers;

use App\Business\Features\References\Commands\UpdateReferenceOrderCommand\UpdateReferenceOrderCommand;
use App\Business\Features\References\Commands\UpdateReferenceOrderCommand\UpdateReferenceOrderCommandRequest;
use App\Business\Features\References\Commands\UpdateReferenceOrderCommand\UpdateReferenceOrderCommandValidator;

use App\Business\Features\References\Queries\GetReferenceListQuery\GetReferenceListQuery;
use App\Business\Features\References\Queries\GetReferenceListQuery\GetReferenceListRequest;
use App\Business\Features\References\Commands\CreateReferenceCommand\CreateReferenceCommand;
use App\Business\Features\References\Commands\CreateReferenceCommand\CreateReferenceCommandRequest;
use App\Business\Features\References\Commands\CreateReferenceCommand\CreateReferenceCommandValidator;
use App\Business\Features\References\Commands\UpdateReferenceCommand\UpdateReferenceCommand;
use App\Business\Features\References\Commands\UpdateReferenceCommand\UpdateReferenceCommandRequest;
use App\Business\Features\References\Commands\UpdateReferenceCommand\UpdateReferenceCommandValidator;
use App\Business\Features\References\Commands\DeleteReferenceCommand\DeleteReferenceCommand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReferenceController extends Controller
{
    public function index(string $lang, GetReferenceListQuery $query): JsonResponse
    {
        $request = new GetReferenceListRequest($lang);
        $result = $query->handle($request);

        return response()->json($result);
    }

    public function createReference(Request $request, CreateReferenceCommand $command, CreateReferenceCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $createRequest = new CreateReferenceCommandRequest(
            name: $request->input('name'),
            role_en: $request->input('role_en'),
            role_tr: $request->input('role_tr'),
            company: $request->input('company'),
            quote_en: $request->input('quote_en'),
            quote_tr: $request->input('quote_tr'),
            request_domain: $request->header('domain') ?? $request->input('domain')
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateReference(Request $request, UpdateReferenceCommand $command, UpdateReferenceCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $updateRequest = new UpdateReferenceCommandRequest(
            id: (int) $request->input('id'),
            name: $request->input('name'),
            role_en: $request->input('role_en'),
            role_tr: $request->input('role_tr'),
            company: $request->input('company'),
            quote_en: $request->input('quote_en'),
            quote_tr: $request->input('quote_tr'),
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteReference(Request $request, DeleteReferenceCommand $command): JsonResponse
    {
        $id = (int) $request->header('id');
        return response()->json($command->handle($id));
    }
    public function updateReferenceOrder(Request $request, UpdateReferenceOrderCommand $command, UpdateReferenceOrderCommandValidator $validator): \Illuminate\Http\JsonResponse
    {
        $validator->validate($request->all());
        $updateRequest = new UpdateReferenceOrderCommandRequest(
            orders: $request->input('orders')
        );
        return response()->json($command->handle($updateRequest));
    }
}