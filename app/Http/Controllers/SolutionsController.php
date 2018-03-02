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
            return response()->json('No data');
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
        $solution->temperature = $request->temperature;
        $solution->humidity = $request->humidity;
        $solution->solution = $request->solution;
        $solution->save();
        return response()->json('Successfull');
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
            return response()->json('No data');
        }    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $solution = Solution::findOrFail($id);
        $solution->temperature = $request->temperature;
        $solution->humidity = $request->humidity;
        $solution->solution = $request->solution;
        $solution->save();
        return response()->json('Updated');
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
        return response()->json('Deleted');
    }
}
