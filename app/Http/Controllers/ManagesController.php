<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Manage;
use App\Device;
use App\Phase;
use App\Solution;
use JWTAuth;

class ManagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $user = JWTAuth::toUser($request->header('token'));
        if($user->role == '1'){
            $manages = Manage::join('devices','manages.deviceId','=','devices.id')
            ->select('manages.deviceId as id','devices.name')
            ->orderBy('id')
            ->get();
            return response()->json($manages);
        }else{
            $manages = Manage::join('devices','manages.deviceId','=','devices.id')
            ->where('userId',$user->id)
            ->select('manages.deviceId as id','devices.name')
            ->orderBy('id')
            ->get();
            return response()->json($manages);
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
        $device = Device::where('code',$request->code)
                            ->where('status', '0')   
                            ->select('id')->first();
            $user = JWTAuth::toUser($request->header('token'));
            if ($device != null && $request->plantId != null) {
            $manage = new Manage();
            $manage->userId = $user->id;
            $manage->deviceId = $device->id;
            $manage->plantId = $request->plantId;
            $manage->isActive = '1';
            $manage->startDate = $request->startDate;
            $manage->endDate = $this->countEndDate($request->phase, $request->startDate);
            $manage->save();
            $this->addPhase($request->phase, $request->plantId, $user->id);
            return response()->json($manage->id);
        }else if ($device != null && $request->plantId == null) {
            $manage = new Manage();
            $manage->userId = $user->id;
            $manage->deviceId = $deviceId->deviceId;
            $manage->isActive = '0';
            $manage->save();
            return response()->json($manage);
        }else if ($device == null) {
            return response()->json(false);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $manage = Manage::findOrFail($id);
        if(!is_null($manage)){
            return response()->json($manage);
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
        $deviceId = Device::where('code',$request->code)->select('deviceId')->first();
        $user = JWTAuth::toUser($request->header('token'));
        $manageId = Manage::where('userId', $user->id)
                        ->where('deviceId', $deviceId->deviceId)
                        ->where('isActive', 1)
                        ->select('id')->first();
        $manage = Manage::findOrFail($manageId);
        $manage->plantId = $request->plantId;
        $manage->save();
        return response()->json($manage);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $deviceId = Device::where('code',$request->code)->select('deviceId')->first();
        $user = JWTAuth::toUser($request->header('token'));
        $manageId = Manage::where('userId', $user->id)
                        ->where('deviceId', $deviceId->deviceId)
                        ->where('isActive', 1)
                        ->select('id')->first();
        $manage = Manage::findOrFail($id);
        $manage->delete();
        return response()->json($manage);
    }

    public function countEndDate($phase, $startDate) {
        $count = 0;
        $endDate = null;
        foreach ($phase as $key => $value) {
            $object = new Phase($value);
            $count = $count + $object->days;
        }
        $endDate = \Carbon\Carbon::parse($startDate)->addDays($count);
        return $endDate;
    }

    public function addPhase($request, $plantId, $userId) {
        foreach ($request as $key => $object) {
            $value = new Phase($object);
            $phase = new Phase();
            $phase->userId = $userId;
            $phase->plantId = $plantId;
            $phase->name = $value->name;
            $phase->days = $value->days;
            $phase->minTemperature = $value->minTemperature;
            $phase->maxTemperature = $value->maxTemperature;
            $phase->minHumidity = $value->minHumidity;
            $phase->maxHumidity = $value->maxHumidity;
            $phase->save();
            $phaseId = $phase->id;
            $this->addSolution($phaseId);
        }
    }

    public function addSolution($phaseId) {
        $solution = new Solution();
        $solution->phaseId = $phaseId;
        $solution->statusTemperature = '-1';
        $solution->statusHumidity = '-1';
        $solution->description = 'The condition is dangerous for the plant. Please increase temperature and humidity.';
        $solution->save();

        $solution = new Solution();
        $solution->phaseId = $phaseId;
        $solution->statusTemperature = '-1';
        $solution->statusHumidity = '0';
        $solution->description = "It's cold. Please keep the plant is warm.";
        $solution->save();

        $solution = new Solution();
        $solution->phaseId = $phaseId;
        $solution->statusTemperature = '-1';
        $solution->statusHumidity = '1';
        $solution->description = 'You should check air condition of the plant.';
        $solution->save();

        $solution = new Solution();
        $solution->phaseId = $phaseId;
        $solution->statusTemperature = '0';
        $solution->statusHumidity = '-1';
        $solution->description = 'Humidity is so dry. The plant need the humidity is wet.';
        $solution->save();

        $solution = new Solution();
        $solution->phaseId = $phaseId;
        $solution->statusTemperature = '1';
        $solution->statusHumidity = '-1';
        $solution->description = "The condition isn't suitable for the plant. You should reduce temperature and increase humidity.";
        $solution->save();

        $solution = new Solution();
        $solution->phaseId = $phaseId;
        $solution->statusTemperature = '0';
        $solution->statusHumidity = '1';
        $solution->description = 'Humidity of air mostphere is so wet. It should be dry.';
        $solution->save();

        $solution = new Solution();
        $solution->phaseId = $phaseId;
        $solution->statusTemperature = '1';
        $solution->statusHumidity = '0';
        $solution->description = "It's hot. The plant need 5% water";
        $solution->save();

        $solution = new Solution();
        $solution->phaseId = $phaseId;
        $solution->statusTemperature = '1';
        $solution->statusHumidity = '1';
        $solution->description = "Temperature and humidity are so high. Please reduce all.";
        $solution->save();
    }
}
