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
                    'id' => 1,
                    'name' => 'Device 1',
                    'manufacturing_date' => \Carbon\Carbon::now()->toDateTimeString(),
                    'code' => '111111',
                    'status' => '1',
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                ],
                [
                    'id' => 2,
                    'name' => 'Device 2',
                    'manufacturing_date' => \Carbon\Carbon::now()->toDateTimeString(),
                    'code' => '111112',
                    'status' => '0',
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                ]
            ]
        );
    }
}
