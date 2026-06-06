<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand\CreateRepoInteractionRequestCommand;
use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand\CreateRepoInteractionRequestCommandRequest;
use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand\CreateRepoInteractionRequestCommandValidator;
use App\Business\Features\RepoInteractionRequests\Queries\GetRepoInteractionRequestListQuery\GetRepoInteractionRequestListQuery;
use App\Business\Features\RepoInteractionRequests\Queries\GetRepoInteractionRequestListQuery\GetRepoInteractionRequestListRequest;
use App\Business\Features\RepoInteractionRequests\Queries\GetRepoInteractionRequestDetailQuery\GetRepoInteractionRequestDetailQuery;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestReadStatusCommand\UpdateRepoInteractionRequestReadStatusCommand;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestHandledStatusCommand\UpdateRepoInteractionRequestHandledStatusCommand;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestCompletedStatusCommand\UpdateRepoInteractionRequestCompletedStatusCommand;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestAdminNoteCommand\UpdateRepoInteractionRequestAdminNoteCommand;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestAdminNoteCommand\UpdateRepoInteractionRequestAdminNoteCommandRequest;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestAdminNoteCommand\UpdateRepoInteractionRequestAdminNoteCommandValidator;
use App\Business\Features\RepoInteractionRequests\Commands\DeleteRepoInteractionRequestCommand\DeleteRepoInteractionRequestCommand;

use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionDetailCommand\CreateRepoInteractionDetailCommand;
use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionDetailCommand\CreateRepoInteractionDetailCommandRequest;
use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionDetailCommand\CreateRepoInteractionDetailCommandValidator;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionDetailCommand\UpdateRepoInteractionDetailCommand;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionDetailCommand\UpdateRepoInteractionDetailCommandRequest;
use App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionDetailCommand\UpdateRepoInteractionDetailCommandValidator;
use App\Business\Features\RepoInteractionRequests\Commands\DeleteRepoInteractionDetailCommand\DeleteRepoInteractionDetailCommand;

class RepoInteractionRequestController extends Controller
{
    public function index(Request $request, GetRepoInteractionRequestListQuery $query): JsonResponse
    {
        $listRequest = new GetRepoInteractionRequestListRequest(
            page: (int) $request->input('page', 1),
            perPage: (int) $request->input('perPage', 10),
            name: $request->input('name'),
            email: $request->input('email'),
            phone: $request->input('phone'),
            interaction_type: $request->input('interaction_type'),
            title: $request->input('title'),
            is_readed: $request->has('is_readed') ? filter_var($request->input('is_readed'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : null,
            is_handled: $request->has('is_handled') ? filter_var($request->input('is_handled'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : null,
            is_completed: $request->has('is_completed') ? filter_var($request->input('is_completed'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : null,
            kvkk_approved: $request->has('kvkk_approved') ? filter_var($request->input('kvkk_approved'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : null
        );

        return response()->json($query->handle($listRequest));
    }

    public function show(int $id, GetRepoInteractionRequestDetailQuery $query): JsonResponse
    {
        return response()->json($query->handle($id));
    }

    public function store(Request $request, CreateRepoInteractionRequestCommand $command, CreateRepoInteractionRequestCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $commandRequest = new CreateRepoInteractionRequestCommandRequest(
            repo_id: $request->input('repo_id'),
            name: $request->input('name'),
            email: $request->input('email'),
            phone: $request->input('phone'),
            interaction_type: $request->input('interaction_type'),
            title: $request->input('title'),
            message: $request->input('message'),
            preferred_contact_time: $request->input('preferred_contact_time'),
            kvkk_approved: $request->input('kvkk_approved'),
            ip_address: $request->ip(),
            user_agent: $request->userAgent(),
            host: $request->getHost()
        );

        return response()->json($command->handle($commandRequest), 201);
    }

    public function updateReadStatus(Request $request, int $id, UpdateRepoInteractionRequestReadStatusCommand $command): JsonResponse
    {
        $is_readed = filter_var($request->input('is_readed'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_readed));
    }

    public function updateHandledStatus(Request $request, int $id, UpdateRepoInteractionRequestHandledStatusCommand $command): JsonResponse
    {
        $is_handled = filter_var($request->input('is_handled'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_handled));
    }

    public function updateCompletedStatus(Request $request, int $id, UpdateRepoInteractionRequestCompletedStatusCommand $command): JsonResponse
    {
        $is_completed = filter_var($request->input('is_completed'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_completed));
    }

    public function updateAdminNote(Request $request, int $id, UpdateRepoInteractionRequestAdminNoteCommand $command, UpdateRepoInteractionRequestAdminNoteCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        $data['id'] = $id;
        $validator->validate($data);

        $commandRequest = new UpdateRepoInteractionRequestAdminNoteCommandRequest(
            id: $id,
            admin_note: $request->input('admin_note')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function destroy(int $id, DeleteRepoInteractionRequestCommand $command): JsonResponse
    {
        return response()->json($command->handle($id));
    }

    public function storeDetail(Request $request, CreateRepoInteractionDetailCommand $command, CreateRepoInteractionDetailCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $commandRequest = new CreateRepoInteractionDetailCommandRequest(
            repo_interaction_id: $request->input('repo_interaction_id'),
            interaction_note: $request->input('interaction_note'),
            contact_result: $request->input('contact_result'),
            host: $request->getHost()
        );

        return response()->json($command->handle($commandRequest), 201);
    }

    public function updateDetail(Request $request, int $id, UpdateRepoInteractionDetailCommand $command, UpdateRepoInteractionDetailCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        $data['id'] = $id;
        $validator->validate($data);

        $commandRequest = new UpdateRepoInteractionDetailCommandRequest(
            id: $id,
            interaction_note: $request->input('interaction_note'),
            contact_result: $request->input('contact_result')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function destroyDetail(int $id, DeleteRepoInteractionDetailCommand $command): JsonResponse
    {
        return response()->json($command->handle($id));
    }
}