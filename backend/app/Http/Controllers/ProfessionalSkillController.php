<?php

namespace App\Http\Controllers;

use App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillOrderCommand\UpdateProfessionalSkillOrderCommand;
use App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillOrderCommand\UpdateProfessionalSkillOrderCommandRequest;
use App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillOrderCommand\UpdateProfessionalSkillOrderCommandValidator;

use App\Business\Features\ProfessionalSkills\Queries\GetProfessionalSkillListQuery\GetProfessionalSkillListQuery;
use App\Business\Features\ProfessionalSkills\Queries\GetProfessionalSkillListQuery\GetProfessionalSkillListRequest;
use App\Business\Features\ProfessionalSkills\Commands\CreateProfessionalSkillCommand\CreateProfessionalSkillCommand;
use App\Business\Features\ProfessionalSkills\Commands\CreateProfessionalSkillCommand\CreateProfessionalSkillCommandRequest;
use App\Business\Features\ProfessionalSkills\Commands\CreateProfessionalSkillCommand\CreateProfessionalSkillCommandValidator;
use App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillCommand\UpdateProfessionalSkillCommand;
use App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillCommand\UpdateProfessionalSkillCommandRequest;
use App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillCommand\UpdateProfessionalSkillCommandValidator;
use App\Business\Features\ProfessionalSkills\Commands\DeleteProfessionalSkillCommand\DeleteProfessionalSkillCommand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfessionalSkillController extends Controller
{
    public function index(string $lang, GetProfessionalSkillListQuery $query): JsonResponse
    {
        $request = new GetProfessionalSkillListRequest($lang);
        $result = $query->handle($request);

        return response()->json($result);
    }

    public function createProfessionalSkill(Request $request, CreateProfessionalSkillCommand $command, CreateProfessionalSkillCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $createRequest = new CreateProfessionalSkillCommandRequest(
            name_en: $request->input('name_en'),
            name_tr: $request->input('name_tr'),
            icon: $request->input('icon'),
            level: $request->input('level'),
            request_domain: $request->header('domain') ?? $request->input('domain')
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateProfessionalSkill(Request $request, UpdateProfessionalSkillCommand $command, UpdateProfessionalSkillCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $updateRequest = new UpdateProfessionalSkillCommandRequest(
            id: (int) $request->input('id'),
            name_en: $request->input('name_en'),
            name_tr: $request->input('name_tr'),
            icon: $request->input('icon'),
            level: $request->input('level'),
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteProfessionalSkill(Request $request, DeleteProfessionalSkillCommand $command): JsonResponse
    {
        $id = (int) $request->header('id');
        return response()->json($command->handle($id));
    }
    public function updateProfessionalSkillOrder(Request $request, UpdateProfessionalSkillOrderCommand $command, UpdateProfessionalSkillOrderCommandValidator $validator): \Illuminate\Http\JsonResponse
    {
        $validator->validate($request->all());
        $updateRequest = new UpdateProfessionalSkillOrderCommandRequest(
            orders: $request->input('orders')
        );
        return response()->json($command->handle($updateRequest));
    }
}