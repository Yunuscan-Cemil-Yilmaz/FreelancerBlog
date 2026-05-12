<?php

namespace App\Business\Features\Domain\Commands\CascadeUpdateDomainCommand;

use App\Models\Domain;

class CascadeUpdateDomainCommand
{
    public function handle(CascadeUpdateDomainCommandRequest $request)
    {
        $validator = new CascadeUpdateDomainCommandValidator();
        $validator->validate($request);

        $domain = Domain::find($request->id);
        
        $oldDomain = $domain->domain;
        $oldAdminDomain = $domain->admin_domain;
        
        $newDomain = $request->domain;
        $newAdminDomain = $request->admin_domain;

        $domainChanged = $oldDomain !== $newDomain;
        $adminDomainChanged = $oldAdminDomain !== $newAdminDomain;

        \Illuminate\Support\Facades\DB::transaction(function() use ($domain, $oldDomain, $oldAdminDomain, $newDomain, $newAdminDomain, $domainChanged, $adminDomainChanged) {
            $domain->update([
                'domain' => $newDomain,
                'admin_domain' => $newAdminDomain,
            ]);

            if ($domainChanged || $adminDomainChanged) {
                $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
                foreach ($tables as $tableObj) {
                    $table = array_values((array)$tableObj)[0];
                    if ($table === 'domains' || $table === 'migrations' || $table === 'personal_access_tokens') {
                        continue;
                    }

                    $columns = \Illuminate\Support\Facades\Schema::getColumnListing($table);
                    
                    if ($domainChanged && in_array('domain', $columns)) {
                        \Illuminate\Support\Facades\DB::table($table)->where('domain', $oldDomain)->update(['domain' => $newDomain]);
                    }
                    if ($adminDomainChanged && in_array('admin_domain', $columns)) {
                        \Illuminate\Support\Facades\DB::table($table)->where('admin_domain', $oldAdminDomain)->update(['admin_domain' => $newAdminDomain]);
                    }
                }
            }
        });

        return new CascadeUpdateDomainCommandResponse(
            id: $domain->id,
            domain: $domain->domain,
            admin_domain: $domain->admin_domain
        );
    }
}