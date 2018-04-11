<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Manage extends Model
{
    // protected $table = "manages";
    protected $fillable = [
        'userId', 'deviceId', 'plantId', 'startDate', 'endDate'
    ];
}
