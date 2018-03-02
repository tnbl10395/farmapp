<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    protected $fillable = [
       'deviceId','humidity','temperature','latitude','longitude','measured_date','status'
    ];
}
