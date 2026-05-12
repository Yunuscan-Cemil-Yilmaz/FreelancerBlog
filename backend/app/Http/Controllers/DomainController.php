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
    public function getDomainsWithPagination(Request $request, GetDomainWithPaginationQuery $query): \Illuminate\Http\JsonResponse
    {
        $queryRequest = new GetDomainWithPaginationQueryRequest(
            page: (int) $request->header('page', 1),
            pageSize: (int) $request->header('pageSize', 10),
            domain: $request->header('domain'),
            admin_domain: $request->header('admin-domain'),
            orderBy: $request->header('orderBy')
        );

        return response()->json($query->handle($queryRequest));
    }

    public function getDomainDetails(Request $request, GetDomainDetailsQuery $query): \Illuminate\Http\JsonResponse
    {
        $queryRequest = new GetDomainDetailsQueryRequest(
            id: (int) $request->header('id')
        );

        return response()->json($query->handle($queryRequest));
    }

    public function createDomain(Request $request, CreateDomainCommand $command): \Illuminate\Http\JsonResponse
    {
        $commandRequest = new CreateDomainCommandRequest(
            domain: $request->input('domain'),
            admin_domain: $request->input('admin_domain')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function updateDomain(Request $request, UpdateDomainCommand $command): \Illuminate\Http\JsonResponse
    {
        $commandRequest = new UpdateDomainCommandRequest(
            id: (int) $request->input('id'),
            domain: $request->input('domain'),
            admin_domain: $request->input('admin_domain')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function cascadeUpdateDomain(Request $request, \App\Business\Features\Domain\Commands\CascadeUpdateDomainCommand\CascadeUpdateDomainCommand $command): \Illuminate\Http\JsonResponse
    {
        $commandRequest = new \App\Business\Features\Domain\Commands\CascadeUpdateDomainCommand\CascadeUpdateDomainCommandRequest(
            id: (int) $request->input('id'),
            domain: $request->input('domain'),
            admin_domain: $request->input('admin_domain')
        );

        return response()->json($command->handle($commandRequest));
    }

    public function deleteDomain(Request $request)
    {
        // here is empty for now
    }
}