<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                [
                    'id' => 1,
                    'username' => 'admin',
                    'password' => bcrypt('admin'),
                    'fullname' => 'Long (Lewis) N.B. TRAN',
                    'address' => '48 Nam Cao Street, Danang City',
                    'phone' => '0905515033',
                    'role' => '1',
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                ],
                [
                    'id' => 2,
                    'username' => 'client1',
                    'password' => bcrypt('happyfarm'),
                    'fullname' => 'Phuong (Patrick) V. NGUYEN',
                    'address' => 'Danang City',
                    'phone' => '01672269262',
                    'role' => '0',
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
                ]
            ]
        );
    }
}