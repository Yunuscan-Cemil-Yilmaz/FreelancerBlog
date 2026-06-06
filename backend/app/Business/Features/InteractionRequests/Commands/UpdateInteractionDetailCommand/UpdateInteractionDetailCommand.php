<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionDetailCommand;

use App\Models\InteractionDetail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateInteractionDetailCommand
{
    public function handle(UpdateInteractionDetailCommandRequest $request): array
    {
        $detail = InteractionDetail::find($request->id);
        if (!$detail) {
            throw new NotFoundHttpException('Detail not found');
        }
        
        $detail->update([
            'interaction_note' => $request->interaction_note
        ]);

        return [
            'message' => 'Detail updated successfully',
            'data' => $detail
        ];
    }
}
