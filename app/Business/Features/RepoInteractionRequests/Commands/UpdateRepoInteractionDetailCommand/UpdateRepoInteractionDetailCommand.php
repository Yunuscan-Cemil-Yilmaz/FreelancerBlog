<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionDetailCommand;

use App\Models\RepoInteractionDetail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateRepoInteractionDetailCommand
{
    public function handle(UpdateRepoInteractionDetailCommandRequest $request): array
    {
        $detail = RepoInteractionDetail::find($request->id);
        if (!$detail) {
            throw new NotFoundHttpException('Detail not found');
        }
        $detail->update([
            'interaction_note' => $request->interaction_note,
            'contact_result' => $request->contact_result,
        ]);
        return ['message' => 'Detail updated successfully', 'data' => $detail];
    }
}