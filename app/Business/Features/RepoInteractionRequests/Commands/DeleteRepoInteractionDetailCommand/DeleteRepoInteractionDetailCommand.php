<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\DeleteRepoInteractionDetailCommand;

use App\Models\RepoInteractionDetail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteRepoInteractionDetailCommand
{
    public function handle(int $id): array
    {
        $detail = RepoInteractionDetail::find($id);
        if (!$detail) {
            throw new NotFoundHttpException('Detail not found');
        }
        $detail->delete();
        return ['message' => 'Detail deleted successfully'];
    }
}