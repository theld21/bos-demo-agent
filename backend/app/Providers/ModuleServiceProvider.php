<?php

namespace App\Providers;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class ModuleServiceProvider extends ServiceProvider
{
    protected string $modulesPath;

    public function __construct($app)
    {
        parent::__construct($app);
        $this->modulesPath = app_path('Modules');
    }

    public function register(): void
    {
        $this->registerModuleProviders();
    }

    public function boot(): void
    {
        $this->loadModuleRoutes();
    }

    protected function registerModuleProviders(): void
    {
        if (!is_dir($this->modulesPath)) {
            return;
        }

        $filesystem = new Filesystem();
        $modules = $filesystem->directories($this->modulesPath);

        foreach ($modules as $module) {
            $moduleName = basename($module);
            $providerClass = "App\\Modules\\{$moduleName}\\Providers\\{$moduleName}ServiceProvider";

            if (class_exists($providerClass)) {
                $this->app->register($providerClass);
            }
        }
    }

    protected function loadModuleRoutes(): void
    {
        if (!is_dir($this->modulesPath)) {
            return;
        }

        $filesystem = new Filesystem();
        $modules = $filesystem->directories($this->modulesPath);

        foreach ($modules as $module) {
            $apiRoutesPath = $module . '/Routes/api.php';
            $webRoutesPath = $module . '/Routes/web.php';

            if ($filesystem->exists($apiRoutesPath)) {
                \Illuminate\Support\Facades\Route::middleware('api')
                    ->prefix('api')
                    ->group($apiRoutesPath);
            }

            if ($filesystem->exists($webRoutesPath)) {
                \Illuminate\Support\Facades\Route::middleware('web')
                    ->group($webRoutesPath);
            }
        }
    }

    public static function getModules(): array
    {
        $modulesPath = app_path('Modules');

        if (!is_dir($modulesPath)) {
            return [];
        }

        $filesystem = new Filesystem();
        $modules = $filesystem->directories($modulesPath);

        return array_map(fn($module) => basename($module), $modules);
    }

    public static function moduleExists(string $moduleName): bool
    {
        return is_dir(app_path("Modules/{$moduleName}"));
    }
}
