<?php

use Illuminate\Database\Seeder;

class PlantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plants')->insert(
            [
                [
                    'id' => '1',
                    'name' => 'Rice plant',
                    'picture' => '',
                    'description' => 'Rice, a monocot, is normally grown as an annual plant, 
                                      although in tropical areas it can survive as a perennial 
                                      and can produce a ratoon crop for up to 30 years. 
                                      Rice cultivation is well-suited to countries 
                                      and regions with low labor costs and high rainfall, 
                                      as it is labor-intensive to cultivate and requires ample water. 
                                      However, rice can be grown practically anywhere, even on a steep hill 
                                      or mountain area with the use of water-controlling terrace systems. 
                                      Although its parent species are native to Asia and certain parts of Africa, 
                                      centuries of trade and exportation have made it commonplace in many cultures worldwide.                    Oryza sativa, commonly known as Asian rice
                                      The traditional method for cultivating rice is flooding the fields while, 
                                      or after, setting the young seedlings. 
                                      This simple method requires sound planning and servicing of the water damming 
                                      and channeling, but reduces the growth of less robust weed 
                                      and pest plants that have no submerged growth state, and deters vermin. 
                                      While flooding is not mandatory for the cultivation of rice, 
                                      all other methods of irrigation require higher effort in weed 
                                      and pest control during growth periods 
                                      and a different approach for fertilizing the soil.'
                ]
            ]
        );
    }
}
