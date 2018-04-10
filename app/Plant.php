<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    protected $fillable = [
        'plantId', 
        'name', 
        'picture', 
        'description',
    ];
}
