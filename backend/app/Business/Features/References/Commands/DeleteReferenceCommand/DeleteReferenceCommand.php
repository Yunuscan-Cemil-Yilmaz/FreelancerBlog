<?php

namespace App\Business\Features\References\Commands\DeleteReferenceCommand;

use App\Models\UserReference;   
use Illuminate\Support\Facades\DB;

class DeleteReferenceCommand
{
    public function handle(int $id): array
    {
        DB::transaction(function () use ($id) {
            $reference = UserReference::lockForUpdate()->findOrFail($id);
            $order = $reference->order;
            $reference->delete();
            UserReference::where('order', '>', $order)->decrement('order');
        });

        return [
            'message' => 'Reference deleted successfully',
        ];
    }
}
