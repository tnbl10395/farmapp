<?php

use Illuminate\Database\Seeder;

class ManagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('manages')->insert(
            [
                [
                    'userId' => '2',
                    'deviceId' => '1',
                    'plantId' => '1',
                    'startDate' => '2018-04-11',
                    'endDate' => '2018-07-11',
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
                ]
            ]
        );
    }
}
