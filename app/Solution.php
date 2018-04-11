<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    // protected $table = "solutions";
    protected $fillable = [
        'phasesId', 'statusTemperature', 'statusHumidity', 'description'
    ];
}
