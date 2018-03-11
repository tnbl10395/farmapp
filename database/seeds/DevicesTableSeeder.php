<?php

use Illuminate\Database\Seeder;

class DevicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('devices')->insert(
            [
                [
                    'name' => 'device_1',
                    'manufacturing_date' => \Carbon\Carbon::now()->toDateTimeString(),
                    'status' => 1,
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                ],
                [
                    'name' => 'device_2',
                    'manufacturing_date' => \Carbon\Carbon::now()->toDateTimeString(),
                    'status' => 2,
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                ]
            ]
        );
    }
}
