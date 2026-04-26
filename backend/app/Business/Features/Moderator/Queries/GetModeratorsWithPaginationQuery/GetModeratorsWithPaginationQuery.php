<?php

namespace App\Business\Features\Moderator\Queries\GetModeratorsWithPaginationQuery;

use App\Models\Moderator;

class GetModeratorsWithPaginationQuery
{
    public function handle(int $page = 1, int $pageSize = 10, ?string $domain = null): array
    {
        $query = Moderator::query();

        if ($domain) {
            $query->where(function ($q) use ($domain) {
                $q->where('domain', $domain)
                  ->orWhere('admin_domain', $domain);
            });
        }

        $moderators = $query->paginate($pageSize, ['*'], 'page', $page);

        return [
            'message' => 'Moderators retrieved successfully',
            'data' => $moderators,
        ];
    }
}
