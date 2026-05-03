<?php

namespace App\Http\Controllers;

use App\Business\Features\Educations\Commands\UpdateEducationOrderCommand\UpdateEducationOrderCommand;
use App\Business\Features\Educations\Commands\UpdateEducationOrderCommand\UpdateEducationOrderCommandRequest;
use App\Business\Features\Educations\Commands\UpdateEducationOrderCommand\UpdateEducationOrderCommandValidator;

use App\Business\Features\Educations\Queries\GetEducationListQuery\GetEducationListQuery;
use App\Business\Features\Educations\Queries\GetEducationListQuery\GetEducationListRequest;
use App\Business\Features\Educations\Commands\CreateEducationCommand\CreateEducationCommand;
use App\Business\Features\Educations\Commands\CreateEducationCommand\CreateEducationCommandRequest;
use App\Business\Features\Educations\Commands\CreateEducationCommand\CreateEducationCommandValidator;
use App\Business\Features\Educations\Commands\UpdateEducationCommand\UpdateEducationCommand;
use App\Business\Features\Educations\Commands\UpdateEducationCommand\UpdateEducationCommandRequest;
use App\Business\Features\Educations\Commands\UpdateEducationCommand\UpdateEducationCommandValidator;
use App\Business\Features\Educations\Commands\DeleteEducationCommand\DeleteEducationCommand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index(string $lang, GetEducationListQuery $query): JsonResponse
    {
        $request = new GetEducationListRequest($lang);
        $result = $query->handle($request);

        return response()->json($result);
    }

    public function createEducation(Request $request, CreateEducationCommand $command, CreateEducationCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $createRequest = new CreateEducationCommandRequest(
            year_en: $request->input('year_en'),
            year_tr: $request->input('year_tr'),
            degree_en: $request->input('degree_en'),
            degree_tr: $request->input('degree_tr'),
            school_en: $request->input('school_en'),
            school_tr: $request->input('school_tr'),
            description_en: $request->input('description_en'),
            description_tr: $request->input('description_tr'),
            request_domain: $request->header('domain') ?? $request->input('domain')
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateEducation(Request $request, UpdateEducationCommand $command, UpdateEducationCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $updateRequest = new UpdateEducationCommandRequest(
            id: (int) $request->input('id'),
            year_en: $request->input('year_en'),
            year_tr: $request->input('year_tr'),
            degree_en: $request->input('degree_en'),
            degree_tr: $request->input('degree_tr'),
            school_en: $request->input('school_en'),
            school_tr: $request->input('school_tr'),
            description_en: $request->input('description_en'),
            description_tr: $request->input('description_tr'),
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteEducation(Request $request, DeleteEducationCommand $command): JsonResponse
    {
        $id = (int) $request->header('id');
        return response()->json($command->handle($id));
    }
    public function updateEducationOrder(Request $request, UpdateEducationOrderCommand $command, UpdateEducationOrderCommandValidator $validator): \Illuminate\Http\JsonResponse
    {
        $validator->validate($request->all());
        $updateRequest = new UpdateEducationOrderCommandRequest(
            orders: $request->input('orders')
        );
        return response()->json($command->handle($updateRequest));
    }
}