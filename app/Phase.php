<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    protected $fillable = [
        'userId',
        'plantId', 
        'name', 
        'days', 
        'minTemperature',
        'maxTemperature',
        'minHumidity',
        'maxHumidity' 
    ];
    public $timestamps = false;
}
