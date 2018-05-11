<?php

namespace App\Http\Controllers;

use App\Sensor;
use App\Manage;
use Illuminate\Http\Request;
use JWTAuth;

class SensorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = JWTAuth::toUser($request->header('token'));
        if($user->role == '1') {
            $sensors = Sensor::join('devices', 'sensors.deviceId', '=', 'devices.id')
                             ->selectRaw('sensors.id, devices.name as deviceName, sensors.deviceId, sensors.name as sensorName,
                                        sensors.tech_specification as specification, sensors.madeIn, 
                                        sensors.manufacturing_date, sensors.code, TO_BASE64(sensors.picture) as picture')
                             ->orderBy('sensors.id', 'asc')
                             ->get()->groupBy('deviceId');
            return response()->json($sensors);
        }else if($user->role == '0'){
            $devices = Manage::where('userId', $user->id)
                             ->select('deviceId')
                             ->get();
            $sensors = Sensor::join('devices', 'sensors.deviceId', '=', 'devices.id')
                             ->whereIn('deviceId',$devices)
                             ->selectRaw('sensors.id, devices.name as deviceName, sensors.name as sensorName, sensors.deviceId,
                                        sensors.tech_specification as specification, sensors.madeIn, 
                                        sensors.manufacturing_date, sensors.code, TO_BASE64(sensors.picture) as picture')
                             ->orderBy('sensors.id', 'asc')
                             ->get()->groupBy('deviceId');
            return response()->json($sensors);
        }      
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
        $sensor = new Sensor();
        $sensor->name = $request->name;
        $sensor->picture = $request->picture;
        $sensor->tech_specification = $request->tech_specification;
        $sensor->deviceId = $request->deviceId;
        $sensor->manufacturing_date = $request->manufacturing_date;
        $sensor->code = $request->code;
        $sensor->save();
        return response()->json(true);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function show(Sensor $sensor)
    {
        $sensor = Sensor::findOrFail($id);
        return response()->json($sensor);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function edit(Sensor $sensor)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $sensor = Sensor::findOrFail($id);
        $sensor->name = $request->name;
        $sensor->picture = $request->picture;
        $sensor->tech_specification = $request->tech_specification;
        $sensor->deviceId = $request->deviceId;
        $sensor->manufacturing_date = $request->manufacturing_date;
        $sensor->code = $request->code;
        $sensor->save();
        return response()->json(true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sensor $sensor)
    {
        $sensor = Sensor::findOrFail($id);
        $sensor->delete();
        return response()->json(true);
    }
}
