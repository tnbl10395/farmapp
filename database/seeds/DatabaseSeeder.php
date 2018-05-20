<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserTableSeeder::class);
        // $this->call(DevicesTableSeeder::class);
        // $this->call(PlantsTableSeeder::class);
        // $this->call(PhasesTableSeeder::class);
        // $this->call(SensorsTableSeeder::class);
        $this->call(LocationsTableSeeder::class);
        // $this->call(SolutionTableSeeder::class);
        $this->call(DataTableSeeder::class);
        // $this->call(ManagesTableSeeder::class);
    }
}
