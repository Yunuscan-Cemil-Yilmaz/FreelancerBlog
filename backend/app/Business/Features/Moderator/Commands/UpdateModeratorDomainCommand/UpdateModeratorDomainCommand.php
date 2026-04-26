<?php

namespace App\Business\Features\Moderator\Commands\UpdateModeratorDomainCommand;

use App\Models\Moderator;
use App\Models\Domain;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateModeratorDomainCommand
{
    public function handle(UpdateModeratorDomainCommandRequest $request): array
    {
        $moderator = Moderator::find($request->id);

        if(!$moderator){
            throw new NotFoundHttpException('Moderator not found');
        }

        $domainData = Domain::find($request->domain_id);

        if (!$domainData) {
            throw new NotFoundHttpException('Domain not found');
        }

        $moderator->update([
            'domain' => $domainData->domain,
            'admin_domain' => $domainData->admin_domain,
        ]);

        return [
            'message' => 'Moderator domains updated successfully',
            'moderator' => $moderator,
        ];
    }
}
