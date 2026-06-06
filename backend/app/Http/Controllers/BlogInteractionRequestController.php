<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionRequestCommand\CreateBlogInteractionRequestCommand;
use App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionRequestCommand\CreateBlogInteractionRequestCommandRequest;
use App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionRequestCommand\CreateBlogInteractionRequestCommandValidator;
use App\Business\Features\BlogInteractionRequests\Queries\GetBlogInteractionRequestListQuery\GetBlogInteractionRequestListQuery;
use App\Business\Features\BlogInteractionRequests\Queries\GetBlogInteractionRequestListQuery\GetBlogInteractionRequestListRequest;
use App\Business\Features\BlogInteractionRequests\Queries\GetBlogInteractionRequestDetailQuery\GetBlogInteractionRequestDetailQuery;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestReadStatusCommand\UpdateBlogInteractionRequestReadStatusCommand;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestHandledStatusCommand\UpdateBlogInteractionRequestHandledStatusCommand;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestCompletedStatusCommand\UpdateBlogInteractionRequestCompletedStatusCommand;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestAdminNoteCommand\UpdateBlogInteractionRequestAdminNoteCommand;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestAdminNoteCommand\UpdateBlogInteractionRequestAdminNoteCommandRequest;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestAdminNoteCommand\UpdateBlogInteractionRequestAdminNoteCommandValidator;
use App\Business\Features\BlogInteractionRequests\Commands\DeleteBlogInteractionRequestCommand\DeleteBlogInteractionRequestCommand;

use App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionDetailCommand\CreateBlogInteractionDetailCommand;
use App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionDetailCommand\CreateBlogInteractionDetailCommandRequest;
use App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionDetailCommand\CreateBlogInteractionDetailCommandValidator;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionDetailCommand\UpdateBlogInteractionDetailCommand;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionDetailCommand\UpdateBlogInteractionDetailCommandRequest;
use App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionDetailCommand\UpdateBlogInteractionDetailCommandValidator;
use App\Business\Features\BlogInteractionRequests\Commands\DeleteBlogInteractionDetailCommand\DeleteBlogInteractionDetailCommand;

class BlogInteractionRequestController extends Controller
{
    public function index(Request $request, GetBlogInteractionRequestListQuery $query): JsonResponse
    {
        $listRequest = new GetBlogInteractionRequestListRequest(
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

    public function show(int $id, GetBlogInteractionRequestDetailQuery $query): JsonResponse
    {
        return response()->json($query->handle($id));
    }

    public function store(Request $request, CreateBlogInteractionRequestCommand $command, CreateBlogInteractionRequestCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $commandRequest = new CreateBlogInteractionRequestCommandRequest(
            blog_id: $request->input('blog_id'),
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

    public function updateReadStatus(Request $request, int $id, UpdateBlogInteractionRequestReadStatusCommand $command): JsonResponse
    {
        $is_readed = filter_var($request->input('is_readed'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_readed));
    }

    public function updateHandledStatus(Request $request, int $id, UpdateBlogInteractionRequestHandledStatusCommand $command): JsonResponse
    {
        $is_handled = filter_var($request->input('is_handled'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_handled));
    }

    public function updateCompletedStatus(Request $request, int $id, UpdateBlogInteractionRequestCompletedStatusCommand $command): JsonResponse
    {
        $is_completed = filter_var($request->input('is_completed'), FILTER_VALIDATE_BOOLEAN);
        return response()->json($command->handle($id, $is_completed));
    }

    public function updateAdminNote(Request $request, int $id, UpdateBlogInteractionRequestAdminNoteCommand $command, UpdateBlogInteractionRequestAdminNoteCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        $data['id'] = $id;
        $validator->validate($data);

        $commandRequest = new UpdateBlogInteractionRequestAdminNoteCommandRequest(
            id: $id,
            admin_note: $request->input('admin_note')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function destroy(int $id, DeleteBlogInteractionRequestCommand $command): JsonResponse
    {
        return response()->json($command->handle($id));
    }

    public function storeDetail(Request $request, CreateBlogInteractionDetailCommand $command, CreateBlogInteractionDetailCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $commandRequest = new CreateBlogInteractionDetailCommandRequest(
            blog_interaction_id: $request->input('blog_interaction_id'),
            interaction_note: $request->input('interaction_note'),
            contact_result: $request->input('contact_result'),
            host: $request->getHost()
        );

        return response()->json($command->handle($commandRequest), 201);
    }

    public function updateDetail(Request $request, int $id, UpdateBlogInteractionDetailCommand $command, UpdateBlogInteractionDetailCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        $data['id'] = $id;
        $validator->validate($data);

        $commandRequest = new UpdateBlogInteractionDetailCommandRequest(
            id: $id,
            interaction_note: $request->input('interaction_note'),
            contact_result: $request->input('contact_result')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function destroyDetail(int $id, DeleteBlogInteractionDetailCommand $command): JsonResponse
    {
        return response()->json($command->handle($id));
    }
}