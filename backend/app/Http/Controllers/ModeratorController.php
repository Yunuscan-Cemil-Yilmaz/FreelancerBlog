<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Business\Features\Moderator\Commands\ModeratorLogin\ModeratorLogin;
use App\Business\Features\Moderator\Commands\ModeratorLogin\ModeratorLoginRequest;
use App\Business\Features\Moderator\Commands\ModeratorLogin\ModeratorLoginValidator;
use App\Business\Features\Moderator\Commands\ModeratorOAuth\ModeratorOAuth;
use App\Business\Features\Moderator\Commands\ModeratorLogout\ModeratorLogout;
use App\Business\Features\Moderator\Commands\CreateModeratorCommand\CreateModeratorCommand;
use App\Business\Features\Moderator\Commands\CreateModeratorCommand\CreateModeratorCommandRequest;
use App\Business\Features\Moderator\Commands\CreateModeratorCommand\CreateModeratorCommandValidator;
use App\Business\Features\Moderator\Commands\DeleteModeratorCommand\DeleteModeratorCommand;
use App\Business\Features\Moderator\Commands\SetActiveStatusModeratorCommand\SetActiveStatusModeratorCommand;
use App\Business\Features\Moderator\Commands\UpdateModeratorDomainCommand\UpdateModeratorDomainCommand;
use App\Business\Features\Moderator\Commands\UpdateModeratorDomainCommand\UpdateModeratorDomainCommandRequest;
use App\Business\Features\Moderator\Commands\UpdateModeratorDomainCommand\UpdateModeratorDomainCommandValidator;
use App\Business\Features\Moderator\Commands\ResetModeratorPasswordCommand\ResetModeratorPasswordCommand;
use App\Business\Features\Moderator\Queries\GetModeratorsWithPaginationQuery\GetModeratorsWithPaginationQuery;

class ModeratorController extends Controller
{
    public function login(Request $request, ModeratorLogin $command, ModeratorLoginValidator $validator)
    {
        $validator->validate($request->all());

        $loginRequest = new ModeratorLoginRequest(
            username: $request->input('username'),
            password: $request->input('password')
        );

        return $command->handle($loginRequest);
    }

    public function oauth(Request $request, ModeratorOAuth $command)
    {
        $moderatorId = $request->header('moderator-id');
        $token = $request->header('token');

        return $command->handle($moderatorId, $token);
    }

    public function logout(Request $request, ModeratorLogout $command)
    {
        $moderatorId = $request->header('moderator-id');
        $token = $request->header('token');

        return $command->handle($moderatorId, $token);
    }

    public function createModerator(Request $request, CreateModeratorCommand $command, CreateModeratorCommandValidator $validator)
    {
        $validator->validate($request->all());

        $createRequest = new CreateModeratorCommandRequest(
            username: $request->input('username'),
            password: $request->input('password'),
            full_name: $request->input('full_name'),
            domain_id: (int) $request->input('domain_id')
        );

        return $command->handle($createRequest);
    }

    public function deleteModerator(Request $request, DeleteModeratorCommand $command)
    {
        $id = $request->header('id');
        return $command->handle((int)$id);
    }

    public function setActiveStatusModerator(Request $request, SetActiveStatusModeratorCommand $command)
    {
        $id = $request->header('id');
        $isActive = (bool)$request->header('is-active');

        return $command->handle((int)$id, $isActive);
    }

    public function updateModeratorDomain(Request $request, UpdateModeratorDomainCommand $command, UpdateModeratorDomainCommandValidator $validator)
    {
        $validator->validate($request->all());

        $updateRequest = new UpdateModeratorDomainCommandRequest(
            id: (int) $request->input('id'),
            domain_id: (int) $request->input('domain_id')
        );

        return $command->handle($updateRequest);
    }

    public function getModerators(Request $request, GetModeratorsWithPaginationQuery $query)
    {
        $page = (int)$request->header('page', 1);
        $pageSize = (int)$request->header('page-size', 10);
        $domain = $request->header('domain');

        return $query->handle($page, $pageSize, $domain);
    }

    public function resetModeratorPassword(Request $request, ResetModeratorPasswordCommand $command)
    {
        $id = $request->header('id');
        $newPassword = $request->header('new-password');

        return $command->handle((int)$id, $newPassword);
    }
}
