<?php

namespace App\Http\Controllers;

use App\Phase;
use App\Manage;
use JWTAuth;
use Illuminate\Http\Request;

class PhaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Phase  $phase
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $phase = Phase::findOrFail($id);
        return response()->json($phase);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Phase  $phase
     * @return \Illuminate\Http\Response
     */
    public function edit(Phase $phase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Phase  $phase
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $totalDayofPlants = 0;
        $user = JWTAuth::toUser($request->header('token'));
        $phase = Phase::findOrFail($id);
        $phase->name = $request->name;
        $phase->days = $request->days;
        $phase->minTemperature = $request->minTemperature;
        $phase->maxTemperature = $request->maxTemperature;
        $phase->minHumidity = $request->minHumidity;
        $phase->maxHumidity = $request->maxHumidity;
        $phase->save();

        $plantId = $phase->plantId;
        
        $phases = Phase::where('plantId', $plantId)
                        ->get();
        foreach ($phases as $key => $value) {
            $totalDayofPlants = $totalDayofPlants + $value->days;
        }

        $manages = Manage::where('plantId', $plantId)
                        ->where('isActive', "1")
                        ->get();

        foreach ($manages as $key => $value) {
            $endDate = \Carbon\Carbon::parse($value->startDate)->addDays($totalDayofPlants);
            $manage = Manage::findOrFail($value->id);
            $manage->endDate = $endDate;
            $manage->save();
        }

        return response()->json(true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Phase  $phase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Phase $phase)
    {
        //
    }
}
