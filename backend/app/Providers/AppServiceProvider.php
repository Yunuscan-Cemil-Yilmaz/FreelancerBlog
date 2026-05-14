<?php

namespace App\Providers;

use App\Business\Extentions\CurrentDomain\CurrentDomain;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(CurrentDomain::class, function () {
            return new CurrentDomain();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $migrationDirs = glob(database_path('migrations/*/')) ?: [];

        sort($migrationDirs);

        $migrationPaths = array_merge(
            [database_path('migrations')],
            $migrationDirs
        );

        $this->loadMigrationsFrom($migrationPaths);
    }
}
