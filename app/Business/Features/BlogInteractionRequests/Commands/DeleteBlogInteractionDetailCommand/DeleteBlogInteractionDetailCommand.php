<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\DeleteBlogInteractionDetailCommand;

use App\Models\BlogInteractionDetail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteBlogInteractionDetailCommand
{
    public function handle(int $id): array
    {
        $detail = BlogInteractionDetail::find($id);
        if (!$detail) {
            throw new NotFoundHttpException('Detail not found');
        }
        $detail->delete();
        return ['message' => 'Detail deleted successfully'];
    }
}