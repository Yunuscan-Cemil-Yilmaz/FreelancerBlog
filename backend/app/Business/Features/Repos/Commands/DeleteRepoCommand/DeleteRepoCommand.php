<?php

namespace App\Business\Features\Repos\Commands\DeleteRepoCommand;

use App\Models\Repo;

class DeleteRepoCommand
{
    public function handle(int $id): array
    {
        $repo = Repo::findOrFail($id);
        $repo->delete();

        return [
            'success' => true,
            'message' => 'Repo deleted successfully'
        ];
    }
}
