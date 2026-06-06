<?php

namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionDetailCommand;

use App\Models\BlogInteractionDetail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateBlogInteractionDetailCommand
{
    public function handle(UpdateBlogInteractionDetailCommandRequest $request): array
    {
        $detail = BlogInteractionDetail::find($request->id);
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
