<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Business\Features\Domain\Queries\GetDomainWithPaginationQuery\GetDomainWithPaginationQueryRequest;
use App\Business\Features\Domain\Queries\GetDomainWithPaginationQuery\GetDomainWithPaginationQuery;

use App\Business\Features\Domain\Queries\GetDomainDetailsQuery\GetDomainDetailsQueryRequest;
use App\Business\Features\Domain\Queries\GetDomainDetailsQuery\GetDomainDetailsQuery;

use App\Business\Features\Domain\Commands\CreateDomainCommand\CreateDomainCommand;
use App\Business\Features\Domain\Commands\CreateDomainCommand\CreateDomainCommandRequest;
use App\Business\Features\Domain\Commands\UpdateDomainCommand\UpdateDomainCommand;
use App\Business\Features\Domain\Commands\UpdateDomainCommand\UpdateDomainCommandRequest;

class DomainController extends Controller
{
    public function getDomainsWithPagination(Request $request, GetDomainWithPaginationQuery $query)
    {
        $queryRequest = new GetDomainWithPaginationQueryRequest(
            page: (int) $request->header('page', 1),
            pageSize: (int) $request->header('pageSize', 10),
            domain: $request->header('domain'),
            admin_domain: $request->header('admin-domain'),
            orderBy: $request->header('orderBy')
        );

        return $query->handle($queryRequest);
    }

    public function getDomainDetails(Request $request, GetDomainDetailsQuery $query)
    {
        $queryRequest = new GetDomainDetailsQueryRequest(
            id: (int) $request->header('id')
        );

        return $query->handle($queryRequest);
    }

    public function createDomain(Request $request, CreateDomainCommand $command)
    {
        $commandRequest = new CreateDomainCommandRequest(
            domain: $request->input('domain'),
            admin_domain: $request->input('admin_domain')
        );

        return $command->handle($commandRequest);
    }

    public function updateDomain(Request $request, UpdateDomainCommand $command)
    {
        $commandRequest = new UpdateDomainCommandRequest(
            id: (int) $request->input('id'),
            domain: $request->input('domain'),
            admin_domain: $request->input('admin_domain')
        );

        return $command->handle($commandRequest);
    }

    public function deleteDomain(Request $request)
    {
        // here is empty for now
    }
}