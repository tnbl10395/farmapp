<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Manage;
use App\Device;
use App\Phase;
use App\Solution;
use App\Plant;
use App\Sensor;
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
            ->where('manages.isActive', '1')
            ->select('manages.deviceId as id','devices.name', 'manages.isActive', 'devices.code')
            ->orderBy('id')
            ->get();
            return response()->json($manages);
        }else{
            $manages = Manage::join('devices','manages.deviceId','=','devices.id')
            ->where('manages.userId',$user->id)
            ->select('manages.deviceId as id','devices.name', 'manages.isActive', 'devices.code', 'manages.name as areaName')
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
                            ->where('status', '1')   
                            ->select('id')->first();
        $user = JWTAuth::toUser($request->header('token'));
        $plant = new Plant();
        $object = new Plant($request->plant);
        $plant->name = $object->name;
        $plant->picture = $request->picture;
        $plant->userId = $user->id;
        $plant->description = $object->description;
        $plant->save();
        if ($device != null) {
            $manage = Manage::where('userId', $user->id)
                            ->where('deviceId', $device->id)
                            ->where('isActive', '0')
                            ->select('id')
                            ->first();
            $manage = Manage::findOrFail($manage->id);
            $manage->userId = $user->id;
            $manage->deviceId = $device->id;
            $manage->plantId = $plant->id;
            $manage->isActive = '1';
            $manage->startDate = \Carbon\Carbon::parse($request->startDate);
            $manage->endDate = $this->countEndDate($request->phase, $request->startDate);
            $manage->save();
            $this->addPhase($request->phase, $plant->id);
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

    public function addPhase($request, $plantId) {
        foreach ($request as $key => $object) {
            $value = new Phase($object);
            $phase = new Phase();
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

    public function getDetailInformationDevices(Request $request, $deviceId) {
        $user = JWTAuth::toUser($request->header('token'));
        if($user->role == '1'){
            $plantId = Manage::where('deviceId', '=', $deviceId)
                            ->where('isActive', '=', 1)
                            ->select('plantId as id', 'startDate', 'endDate', 'name')
                            ->first();
            $plant = Plant::where('id', '=', $plantId->id)
                            ->select('id', 'name', 'description')
                            ->first();
            $picturePlant = Plant::where('id', '=', $plantId->id)
                                ->select('picture')
                                ->first();
            //              
            $device = Device::findOrFail($deviceId);
            //
            $date = Manage::selectRaw('CURDATE() as getDate')->first();
            //
            $now = Manage::where('deviceId', '=', $deviceId)
                            ->where('isActive', '=', 1)
                            ->selectRaw('DATEDIFF("'.$date->getDate.'", startDate) as days')
                            ->first();
            // $sensor = Sensor::where('$deviceId', '=', $deviceId);
            //
            $phases = Phase::where('plantId', '=', $plantId->id)->get();
            $totalDaysOfPhases = 0;
            foreach ($phases as $key => $value) {
                $totalDaysOfPhases = $totalDaysOfPhases + $value->days;
            }
            //
            $phaseId = Phase::where('plantId', '=', $plantId->id)->select('id')->first();
            $solutions = Solution::where('phaseId', '=', $phaseId->id)->get();
            $data = [
                'device' => $device,
                'plant' => $plant,
                'phases' => $phases,
                'solutions' => $solutions,
                'totalDaysOfPhases' => $totalDaysOfPhases,
                'totalPhases' => count($phases),
                'startDate' => $plantId->startDate,
                'endDate' => $plantId->endDate,
                'picture' => $picturePlant->picture,
                'now' => $now->days,
                'areaName' => $plantId->name
            ];
            return response()->json($data);
        }else {
            $plantId = Manage::where('deviceId', '=', $deviceId)
                            ->where('isActive', '=', 1)
                            ->where('userId', '=', $user->id)
                            ->select('plantId as id', 'startDate', 'endDate', 'name')
                            ->first();
            $plant = Plant::where('id', '=', $plantId->id)
                            ->select('id', 'name', 'description')
                            ->first();
            $picturePlant = Plant::where('id', '=', $plantId->id)
                                ->select('picture')
                                ->first();
            //
            $device = Device::findOrFail($deviceId);
            //
            $date = Manage::selectRaw('CURDATE() as getDate')->first();
            //
            $now = Manage::where('deviceId', '=', $deviceId)
                            ->where('isActive', '=', 1)
                            ->selectRaw('DATEDIFF("'.$date->getDate.'", startDate) as days')
                            ->first();
            // $sensor = Sensor::where('$deviceId', '=', $deviceId);
            //
            $phases = Phase::where('plantId', '=', $plantId->id)->get();
            $totalDaysOfPhases = 0;
            foreach ($phases as $key => $value) {
                $totalDaysOfPhases = $totalDaysOfPhases + $value->days;
            }
            //
            $phaseId = Phase::where('plantId', '=', $plantId->id)->select('id')->first();
            $solutions = Solution::where('phaseId', '=', $phaseId->id)->get();
            $data = [
                'device' => $device,
                'plant' => $plant,
                'phases' => $phases,
                'solutions' => $solutions,
                'totalDaysOfPhases' => $totalDaysOfPhases,
                'totalPhases' => count($phases),
                'startDate' => $plantId->startDate,
                'endDate' => $plantId->endDate,
                'picture' => $picturePlant->picture,
                'now' => $now->days,
                'areaName' => $plantId->name
            ];
            return response()->json($data);
        }
    }

    public function getListDeviceActive(Request $request) 
    {
        $user = JWTAuth::toUser($request->header('token'));
        if($user->role == '1'){
            $manages = Manage::join('devices','manages.deviceId','=','devices.id')
            ->where('manages.isActive', '1')
            ->select('manages.deviceId as id','devices.name', 'manages.isActive', 'devices.code', 'manages.name as areaName')
            ->orderBy('id')
            ->get();
            return response()->json($manages);
        }else{
            $manages = Manage::join('devices','manages.deviceId','=','devices.id')
            ->where('manages.userId',$user->id)
            ->where('manages.isActive', '1')
            ->select('manages.deviceId as id','devices.name', 'manages.isActive', 'devices.code', 'manages.name as areaName')
            ->orderBy('id')
            ->get();
            return response()->json($manages);
        }
    }

    public function addPlantForDevice(Request $request) 
    {
        $totalDays = 0;
        $user = JWTAuth::toUser($request->header('token'));
        $device = Device::where('code', $request->code)->select('id')->first();
        $manage = Manage::where('userId', $user->id)
                        ->where('deviceId', $device->id)
                        ->where('isActive', '0')
                        ->first();
        $phases = Phase::where('plantId', $request->plantId)->get();
        foreach ($phases as $key => $value) {
            $totalDays = $totalDays + $value->days;
        }
        $endDate = \Carbon\Carbon::parse($request->startDate)->addDays($totalDays);
        $manage->plantId = $request->plantId;
        $manage->startDate = \Carbon\Carbon::parse($request->startDate);
        $manage->endDate = $endDate;
        $manage->isActive = "1";
        $manage->save();
        return response()->json($manage);
    }

    public function getAllArea(Request $request) {
        $user = JWTAuth::toUser($request->header('token'));
        $area = Manage::leftJoin('devices', 'manages.deviceId', '=', 'devices.id')
                        ->leftJoin('plants', 'manages.plantId', '=', 'plants.id')
                        ->where('manages.userId', $user->id)
                        ->select('manages.*', 'devices.name as deviceName', 'plants.name as plantName')
                        ->orderBy('manages.id')
                        ->get();
        return response()->json($area);
    }
    
    public function getOneArea(Request $request, $id) {
        $user = JWTAuth::toUser($request->header('token'));
        $area = Manage::where('userId', $user->id)
                        ->where('id', $id)
                        ->get();
        return response()->json($area);    
    }
    
    public function storeOneArea(Request $request) {
        $user = JWTAuth::toUser($request->header('token'));
        $area =  new Manage();
        $area->name = $request->name;
        $area->userId = $user->id;
        $area->deviceId = $request->deviceId;
        $area->isActive = '0';
        $area->save();
        return response()->json(true);
    }
    
    public function updateOneArea(Request $request, $id) {
        $area = Manage::findOrFail($id);
        $area->name = $request->name;
        $area->save();
        return response()->json(true);
    }
    
    public function deleteOneArea($id) {
        $area = Manage::findOrFail($id);
        $area->delete();
        return response()->json($area);        
    }
}