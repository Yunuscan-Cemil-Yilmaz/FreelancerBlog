<?php

namespace App\Business\Features\InteractionRequests\Commands\DeleteInteractionDetailCommand;

use App\Models\InteractionDetail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteInteractionDetailCommand
{
    public function handle(int $id): array
    {
        $detail = InteractionDetail::find($id);
        if (!$detail) {
            throw new NotFoundHttpException('Detail not found');
        }
        
        $detail->delete();

        return [
            'message' => 'Detail deleted successfully'
        ];
    }
}
