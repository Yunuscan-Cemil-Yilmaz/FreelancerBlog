<?php

namespace App\Business\Features\References\Commands\DeleteReferenceCommand;

use App\Models\Reference;   
use Illuminate\Support\Facades\DB;

class DeleteReferenceCommand
{
    public function handle(int $id): array
    {
        DB::transaction(function () use ($id) {
            $reference = Reference::lockForUpdate()->findOrFail($id);
            $order = $reference->order;
            $reference->delete();
            Reference::where('order', '>', $order)->decrement('order');
        });

        return [
            'message' => 'Reference deleted successfully',
        ];
    }
}
