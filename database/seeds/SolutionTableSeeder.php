<?php

use Illuminate\Database\Seeder;

class SolutionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 4; $i++) {
            DB::table('solutions')->insert(
                [
                    [
                        'phaseId' => $i,
                        'statusTemperature' => '-1',
                        'statusHumidity' => '-1',
                        'description' => 'The condition is dangerous for the plant. Please increase temperature and humidity.',
                        'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                        'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    ],
                    [
                        'phaseId' => $i,
                        'statusTemperature' => '-1',
                        'statusHumidity' => '0',
                        'description' => "It's cold. Please keep the plant is warm.",
                        'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                        'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    ],
                    [
                        'phaseId' => $i,
                        'statusTemperature' => '-1',
                        'statusHumidity' => '1',
                        'description' => 'You should check air condition of the plant.',
                        'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                        'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    ],
                    [
                        'phaseId' => $i,
                        'statusTemperature' => '0',
                        'statusHumidity' => '-1',
                        'description' => 'Humidity is so dry. The plant need the humidity is wet',
                        'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                        'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    ],
                    [
                        'phaseId' => $i,
                        'statusTemperature' => '1',
                        'statusHumidity' => '-1',
                        'description' => "The condition isn't suitable for the plant. 
                                          You should reduce temperature and increase humidity.",
                        'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                        'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    ],
                    [
                        'phaseId' => $i,
                        'statusTemperature' => '0',
                        'statusHumidity' => '1',
                        'description' => 'Humidity of air mostphere is so wet. It should be dry.',
                        'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                        'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    ],
                    [
                        'phaseId' => $i,
                        'statusTemperature' => '1',
                        'statusHumidity' => '0',
                        'description' => "It's hot. The plant need 5% water",
                        'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                        'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    ],
                    [
                        'phaseId' => $i,
                        'statusTemperature' => '1',
                        'statusHumidity' => '1',
                        'description' => "Temperature and humidity are so high. Please reduce all.",
                        'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                        'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    ]
                ]
            );
        }
    }
}
