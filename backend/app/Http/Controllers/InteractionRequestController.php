<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Business\Features\InteractionRequests\Commands\CreateInteractionRequestCommand\CreateInteractionRequestCommand;
use App\Business\Features\InteractionRequests\Commands\CreateInteractionRequestCommand\CreateInteractionRequestCommandRequest;
use App\Business\Features\InteractionRequests\Commands\CreateInteractionRequestCommand\CreateInteractionRequestCommandValidator;
use App\Business\Features\InteractionRequests\Queries\GetInteractionRequestListQuery\GetInteractionRequestListQuery;
use App\Business\Features\InteractionRequests\Queries\GetInteractionRequestListQuery\GetInteractionRequestListRequest;
use App\Business\Features\InteractionRequests\Queries\GetInteractionRequestDetailQuery\GetInteractionRequestDetailQuery;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestReadStatusCommand\UpdateInteractionRequestReadStatusCommand;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestHandledStatusCommand\UpdateInteractionRequestHandledStatusCommand;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestCompletedStatusCommand\UpdateInteractionRequestCompletedStatusCommand;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestAdminNoteCommand\UpdateInteractionRequestAdminNoteCommand;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestAdminNoteCommand\UpdateInteractionRequestAdminNoteCommandRequest;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestAdminNoteCommand\UpdateInteractionRequestAdminNoteCommandValidator;
use App\Business\Features\InteractionRequests\Commands\DeleteInteractionRequestCommand\DeleteInteractionRequestCommand;

use App\Business\Features\InteractionRequests\Commands\CreateInteractionDetailCommand\CreateInteractionDetailCommand;
use App\Business\Features\InteractionRequests\Commands\CreateInteractionDetailCommand\CreateInteractionDetailCommandRequest;
use App\Business\Features\InteractionRequests\Commands\CreateInteractionDetailCommand\CreateInteractionDetailCommandValidator;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionDetailCommand\UpdateInteractionDetailCommand;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionDetailCommand\UpdateInteractionDetailCommandRequest;
use App\Business\Features\InteractionRequests\Commands\UpdateInteractionDetailCommand\UpdateInteractionDetailCommandValidator;
use App\Business\Features\InteractionRequests\Commands\DeleteInteractionDetailCommand\DeleteInteractionDetailCommand;

class InteractionRequestController extends Controller
{
    public function index(Request $request, GetInteractionRequestListQuery $query): JsonResponse
    {
        $listRequest = new GetInteractionRequestListRequest(
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

    public function show(int $id, GetInteractionRequestDetailQuery $query): JsonResponse
    {
        return response()->json($query->handle($id));
    }

    public function store(Request $request, CreateInteractionRequestCommand $command, CreateInteractionRequestCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $commandRequest = new CreateInteractionRequestCommandRequest(
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

    public function updateReadStatus(Request $request, int $id, UpdateInteractionRequestReadStatusCommand $command): JsonResponse
    {
        $is_readed = filter_var($request->input('is_readed'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_readed));
    }

    public function updateHandledStatus(Request $request, int $id, UpdateInteractionRequestHandledStatusCommand $command): JsonResponse
    {
        $is_handled = filter_var($request->input('is_handled'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_handled));
    }

    public function updateCompletedStatus(Request $request, int $id, UpdateInteractionRequestCompletedStatusCommand $command): JsonResponse
    {
        $is_completed = filter_var($request->input('is_completed'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_completed));
    }

    public function updateAdminNote(Request $request, int $id, UpdateInteractionRequestAdminNoteCommand $command, UpdateInteractionRequestAdminNoteCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        $data['id'] = $id;
        $validator->validate($data);

        $commandRequest = new UpdateInteractionRequestAdminNoteCommandRequest(
            id: $id,
            admin_note: $request->input('admin_note')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function destroy(int $id, DeleteInteractionRequestCommand $command): JsonResponse
    {
        return response()->json($command->handle($id));
    }

    public function storeDetail(Request $request, CreateInteractionDetailCommand $command, CreateInteractionDetailCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $commandRequest = new CreateInteractionDetailCommandRequest(
            interaction_id: $request->input('interaction_id'),
            interaction_note: $request->input('interaction_note'),
            contact_result: $request->input('contact_result'),
            host: $request->getHost()
        );

        return response()->json($command->handle($commandRequest), 201);
    }

    public function updateDetail(Request $request, int $id, UpdateInteractionDetailCommand $command, UpdateInteractionDetailCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        $data['id'] = $id;
        $validator->validate($data);

        $commandRequest = new UpdateInteractionDetailCommandRequest(
            id: $id,
            interaction_note: $request->input('interaction_note'),
            contact_result: $request->input('contact_result')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function destroyDetail(int $id, DeleteInteractionDetailCommand $command): JsonResponse
    {
        return response()->json($command->handle($id));
    }
}