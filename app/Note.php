<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'userId', 'sumary', 'description', 'datetime'
    ];
    public $timestamps = false;
}
