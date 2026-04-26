<?php

namespace App\Business\Features\Domain\Queries\GetDomainWithPaginationQuery;

use App\Models\Domain;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetDomainWithPaginationQuery
{
    public function handle(GetDomainWithPaginationQueryRequest $request): GetDomainWithPaginationResponse
    {
        if ($request->pageSize > 99) {
            throw new \InvalidArgumentException('Page size cannot be greater than 99');
        }

        $query = Domain::query();

        if ($request->domain) {
            $query->where('domain', 'like', '%' . $request->domain . '%');
        }

        if ($request->admin_domain) {
            $query->where('admin_domain', 'like', '%' . $request->admin_domain . '%');
        }

        if ($request->orderBy) {
            $parts = explode(' ', $request->orderBy);
            $column = $parts[0];
            $direction = $parts[1] ?? 'asc';
            
            // Validate column to prevent SQL injection if necessary, 
            // but assuming for now the requested column is valid as per table structure.
            $query->orderBy($column, $direction);
        }

        $domains = $query->paginate(
            perPage: $request->pageSize,
            columns: ['*'],
            pageName: 'page',
            page: $request->page
        );

        if ($domains->isEmpty()) {
            throw new ModelNotFoundException('No domains found');
        }

        return new GetDomainWithPaginationResponse('Domains retrieved successfully', $domains);
    }
}