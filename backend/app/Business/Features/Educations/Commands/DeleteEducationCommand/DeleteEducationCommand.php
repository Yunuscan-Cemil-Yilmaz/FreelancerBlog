<?php

namespace App\Business\Features\Educations\Commands\DeleteEducationCommand;

use App\Models\Education;
use Illuminate\Support\Facades\DB;

class DeleteEducationCommand
{
    public function handle(int $id): array
    {
        DB::transaction(function () use ($id) {
            $education = Education::lockForUpdate()->findOrFail($id);
            $order = $education->order;
            $education->delete();
            Education::where('order', '>', $order)->decrement('order');
        });

        return [
            'message' => 'Education deleted successfully',
        ];
    }
}
