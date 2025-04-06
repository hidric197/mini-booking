<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeServiceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name : The name of the service} {--path=App/Services}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');
        $path = $this->option('path');

        if (!File::exists($path)) {
            File::makeDirectory($path, 0755, true);
        }

        $filePath = "{$path}/{$name}.php";

        if (File::exists($filePath)) {
            $this->error("Service '{$name}' already exists!");
            return 1;
        }

        $nameSpace = "App\Services";
        if ($path) {
        	$path = str_replace("/", "\\", $path);
        	$nameSpace = str_replace("\app", "", $path);
        }

        $template = "<?php

namespace $nameSpace;

class {$name}
{
    // Add your service methods here
}
";

        File::put($filePath, $template);

        $this->info("Service '{$name}' created successfully.");
        return 0;
    }
}
