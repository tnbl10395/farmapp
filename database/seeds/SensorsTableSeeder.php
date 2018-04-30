<?php

use Illuminate\Database\Seeder;

class SensorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sensors')->insert(
            [
                [
                    'id' => 1,
                    'deviceId' => 1,
                    'picture' => '',
                    'name' => 'Arduino UNO'
                ]
            ]
        );
    }
}
