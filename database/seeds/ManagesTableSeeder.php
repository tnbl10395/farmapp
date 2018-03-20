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
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
                ]
            ]
        );
    }
}
