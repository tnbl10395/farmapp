<?php

use Illuminate\Database\Seeder;

class DataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dt = \Carbon\Carbon::now();
        // for ($i= 1; $i <= 1000; $i++) {
        //     DB::table('data')->insert(
        //         [
        //             [
        //                 'id' => $i,
        //                 'deviceId' => 1,
        //                 'humidity' => rand(20,50),
        //                 'temperature' => rand(20,50),
        //                 'status' => '1',
        //                 'created_at' => $dt,
        //                 'updated_at' => $dt,
        //             ]
        //         ]
        //     ); 
        //     $dt = $dt->subMinute();
        // }
        for ($i= 1; $i <= 4320; $i++) {
            DB::table('data')->insert(
                [
                    [
                        // 'id' => $i,
                        'deviceId' => 2,
                        'humidity' => rand(50,60),
                        'temperature' => rand(27,32),
                        'status' => '1',
                        'created_at' => $dt,
                        'updated_at' => $dt,
                    ]
                ]
            ); 
            $dt = $dt->addSeconds(9);
        }
    }
}
