<?php

namespace App\Http\Controllers;

use App\Business\Features\Experiances\Commands\UpdateExperienceOrderCommand\UpdateExperienceOrderCommand;
use App\Business\Features\Experiances\Commands\UpdateExperienceOrderCommand\UpdateExperienceOrderCommandRequest;
use App\Business\Features\Experiances\Commands\UpdateExperienceOrderCommand\UpdateExperienceOrderCommandValidator;

use App\Business\Features\Experiances\Queries\GetExperianceListQuery\GetExperianceListQuery;
use App\Business\Features\Experiances\Queries\GetExperianceListQuery\GetExperianceListRequest;
use App\Business\Features\Experiances\Commands\CreateExperianceCommand\CreateExperianceCommand;
use App\Business\Features\Experiances\Commands\CreateExperianceCommand\CreateExperianceCommandRequest;
use App\Business\Features\Experiances\Commands\CreateExperianceCommand\CreateExperianceCommandValidator;
use App\Business\Features\Experiances\Commands\UpdateExperianceCommand\UpdateExperianceCommand;
use App\Business\Features\Experiances\Commands\UpdateExperianceCommand\UpdateExperianceCommandRequest;
use App\Business\Features\Experiances\Commands\UpdateExperianceCommand\UpdateExperianceCommandValidator;
use App\Business\Features\Experiances\Commands\DeleteExperianceCommand\DeleteExperianceCommand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index(string $lang, GetExperianceListQuery $query): JsonResponse
    {
        $request = new GetExperianceListRequest($lang);
        $result = $query->handle($request);

        return response()->json($result);
    }

    public function createExperience(Request $request, CreateExperianceCommand $command, CreateExperianceCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $createRequest = new CreateExperianceCommandRequest(
            year_en: $request->input('year_en'),
            year_tr: $request->input('year_tr'),
            role_en: $request->input('role_en'),
            role_tr: $request->input('role_tr'),
            company_en: $request->input('company_en'),
            company_tr: $request->input('company_tr'),
            description_en: $request->input('description_en'),
            description_tr: $request->input('description_tr'),
            request_domain: $request->header('domain') ?? $request->input('domain')
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateExperience(Request $request, UpdateExperianceCommand $command, UpdateExperianceCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $updateRequest = new UpdateExperianceCommandRequest(
            id: (int) $request->input('id'),
            year_en: $request->input('year_en'),
            year_tr: $request->input('year_tr'),
            role_en: $request->input('role_en'),
            role_tr: $request->input('role_tr'),
            company_en: $request->input('company_en'),
            company_tr: $request->input('company_tr'),
            description_en: $request->input('description_en'),
            description_tr: $request->input('description_tr'),
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteExperience(Request $request, DeleteExperianceCommand $command): JsonResponse
    {
        $id = (int) $request->header('id');
        return response()->json($command->handle($id));
    }
    public function updateExperienceOrder(Request $request, UpdateExperienceOrderCommand $command, UpdateExperienceOrderCommandValidator $validator): \Illuminate\Http\JsonResponse
    {
        $validator->validate($request->all());
        $updateRequest = new UpdateExperienceOrderCommandRequest(
            orders: $request->input('orders')
        );
        return response()->json($command->handle($updateRequest));
    }
}