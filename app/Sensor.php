<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    protected $fillable = [
        'deviceId',
        'name',
        'picture',
        'code',
        'tech_spectification',
        'madeIn',
        'manufacturing_date'
    ];
    public $timestamps = false;
}
