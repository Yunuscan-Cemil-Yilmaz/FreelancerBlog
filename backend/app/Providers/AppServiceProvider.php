<?php

namespace App\Providers;

use App\Support\CurrentDomain;
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
        $migrationDirs = glob(database_path('migrations/*/'));
        foreach ($migrationDirs as $dir) {
            $this->loadMigrationsFrom($dir);
        }
    }
}
