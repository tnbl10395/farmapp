<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    protected $fillable = [
        'plantId', 
        'name', 
        'days', 
        'minTemperature',
        'maxTemperature',
        'minHumidity',
        'maxHumidity' 
    ];
}
