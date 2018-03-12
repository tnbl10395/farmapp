<?php

namespace App\Http\Middleware;

use Closure;

class CheckKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $data = $request->data;
        $array = explode('-',$data);
        if($array[0]==md5('happyfarm'))
        {
            return $next($request);
        }
        else 
        {
            return response()->json('The key has problems!');
        }
    }
}
