<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand\CreateRepoInteractionRequestCommand;
use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand\CreateRepoInteractionRequestCommandRequest;
use App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand\CreateRepoInteractionRequestCommandValidator;

class RepoInteractionRequestController extends Controller
{
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
}
