<?php

use Illuminate\Database\Seeder;

class PhasesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phases')->insert(
            [
                [
                    'id' => 1,
                    'plantId' => 1,
                    'name' => 'Germination phase',
                    'days' => 3,
                    'minTemperature' => 30,
                    'maxTemperature' => 35,
                    'minHumidity' => 25,
                    'maxHumidity' => 35,
                ],
                [
                    'id' => 2,
                    'plantId' => 1,
                    'name' => 'Planting phase',
                    'days' => 45,
                    'minTemperature' => 25,
                    'maxTemperature' => 30,
                    'minHumidity' => 50,
                    'maxHumidity' => 70,
                ],
                [
                    'id' => 3,
                    'plantId' => 1,
                    'name' => 'Branching phase',
                    'days' => 32,
                    'minTemperature' => 25,
                    'maxTemperature' => 32,
                    'minHumidity' => 50,
                    'maxHumidity' => 70,
                ],
                [
                    'id' => 4,
                    'plantId' => 1,
                    'name' => 'Havest phase',
                    'days' => 10,
                    'minTemperature' => 28,
                    'maxTemperature' => 30,
                    'minHumidity' => 20,
                    'maxHumidity' => 27,
                ]
            ]
        );
    }
}
