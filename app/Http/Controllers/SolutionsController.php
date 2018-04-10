<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Solution;

class SolutionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $solutions = Solution::all();
        if(count($solutions) > 0){
            return response()->json($solutions);
        }else{
            return response()->json(null);
        }      
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $solution = new Solution();
        $solution->planId = $request->plantId;
        $solution->min_temperature = $request->min_temperature;
        $solution->min_humidity = $request->min_humidity;
        $solution->max_temperature = $request->max_temperature;
        $solution->max_humidity = $request->max_humidity;
        $solution->solution = $request->solution;
        $solution->save();
        return response()->json($solution);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $solution = Solution::findOrFail($id);
        if(!is_null($solution)){
            return response()->json($solution);
        }else{
            return response()->json(false);
        }    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        foreach ($request as $object) {
            $solution = Solution::findOrFail($object->id);
            $solution->planId = $object->plantId;
            $solution->min_temperature = $object->min_temperature;
            $solution->min_humidity = $object->min_humidity;
            $solution->max_temperature = $object->max_temperature;
            $solution->max_humidity = $object->max_humidity;
            $solution->solution = $object->solution;
            $solution->save();
        }
        return response()->json(true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $solution = Solution::findOrFail($id);
        $solution->delete();
        return response()->json($solution);
    }
}
