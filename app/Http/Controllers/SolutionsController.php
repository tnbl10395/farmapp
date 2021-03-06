<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Solution;
use App\Phase;
use App\Device;
use App\Plant;
use App\Manage;
use App\Data;
use App\Location;
use JWTAuth;

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
    public function show(Request $request)
    {
        $solutions = Solution::where('phaseId', $request->phaseId)->get();
        return response()->json($solutions);
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
        $solution->description = $request->description;
        $solution->save();
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

    public function notificationSolution(Request $request, $deviceId) {
        $now = \Carbon\Carbon::now();
        $device = Device::where('id', '=', $deviceId)
                        ->select('id', 'name', 'code')
                        ->get();
        $datetime = Device::selectRaw('NOW() as datetime')->first();
        $data = Data::where('deviceId', '=', $deviceId)
                    ->whereRaw('substr(updated_at,1,16) = "'.$this->getDateBasedOnMinute($now).'"')
                    ->select('id','humidity', 'temperature')
                    ->orderBy('id', 'desc')
                    ->first();
        if ($data == null) {
            $sendData = [
                'deviceId' => $deviceId,
                'message' => "Your device can't measure. Please check your device again",
                'datetime' => $datetime->datetime
            ];
            return response()->json($sendData);
        }

        $plant = Manage::where('deviceId', '=', $deviceId)
                        ->select('plantId as id', 'startDate')
                        ->first();
        $phases = Phase::where('plantId', '=', $plant->id)
                        ->orderBy('id')
                        ->get();
        for($i = 0; $i < count($phases); $i++){
            if ($i == 0) $startDate = \Carbon\Carbon::parse($plant->startDate);
            else $startDate = \Carbon\Carbon::parse($plant->startDate)->addDays($phases[$i-1]->days);
            $endDate = \Carbon\Carbon::parse($plant->startDate)->addDays($phases[$i]->days);
            if ($startDate < $now && $now < $endDate) {
                $statusHumidity = $this->compareValue($phases[$i]->minHumidity, $phases[$i]->maxHumidity, $data->humidity);
                $statusTemperature = $this->compareValue($phases[$i]->minTemperature, $phases[$i]->maxTemperature, $data->temperature);
                $solution = $this->getSolution($statusHumidity, $statusTemperature, $phases[$i]->id);
                $sendData = [
                    'message' => "OK",
                    'deviceId' => $deviceId,
                    'solution' => $solution,
                    'data' => $data,
                    'phase' => $phases[$i]
                ];
                break;
            }
        }
        return response()->json($sendData);
    }

    public function compareValue($min, $max, $value) {
        if ($value < $min) {
            return '-1';
        }else if($value >= $min && $value <= $max) {
            return '0';
        }else if($value > $max) {
            return '1';
        }
    }

    public function getSolution($statusHumidity, $statusTemperature, $phaseId){
        $solution = Solution::where('phaseId', '=', $phaseId)
                            ->where('statusHumidity', '=', $statusHumidity)
                            ->where('statusTemperature', '=', $statusTemperature)
                            ->selectRaw('id as solutionId , phaseId, statusTemperature, statusHumidity, description, NOW() as getSolutionDate')
                            ->first();
        return $solution;
    }

    public function getDateBasedOnMinute($now) {
        $year = $now->year;
        if ($now->month < 10) $month = '0'.$now->month;
        else $month = $now->month;

        if ($now->day < 10) $day = '0'.$now->day;
        else $day = $now->day;

        if ($now->hour < 10) $hour = '0'.$now->hour;
        else $hour = $now->hour;

        if ($now->minute < 10) $minute = '0'.$now->minute;
        else $minute = $now->minute;
        return $year.'-'.$month.'-'.$day.' '.$hour.':'.$minute;
    }

    public function getListNotifications(Request $request) {
        $arrayDeviceId = [];
        $sendData = [];
        $user = JWTAuth::toUser($request->header('token'));
        $now = \Carbon\Carbon::now();
        $datetime = Device::selectRaw('NOW() as datetime')->first();
        $date = Manage::selectRaw('CURDATE() as getDate')->first();
        //
        if ($user->role == 1){
            $devices = Device::join('manages', 'devices.id', '=', 'manages.deviceId')
            ->where('isActive', '=', 1)
            ->select('devices.id as deviceId', 'devices.name as nameDevice', 'devices.code as codeDevice')
            ->get();
        }else {
            $devices = Device::join('manages', 'devices.id', '=', 'manages.deviceId')
            ->where('manages.userId', '=', $user->id)
            ->where('isActive', '=', 1)
            ->select('devices.id as deviceId', 'devices.name as nameDevice', 'devices.code as codeDevice')
            ->get();
        }

        foreach ($devices as $key => $value) {
            array_push($arrayDeviceId, $value->deviceId);
        }

        $data = Data::whereIn('deviceId', $arrayDeviceId)
                    ->whereRaw('substr(updated_at,1,16) = "'.$this->getDateBasedOnMinute($now).'"')
                    ->select(['id','humidity', 'temperature', 'deviceId'])
                    ->orderBy('id', 'desc')
                    ->get()->groupBy('deviceId');
        
        if (count($data) == 0) {
            foreach ($devices as $key => $value) {
                $getNow = Manage::where('deviceId', '=', $value->deviceId)
                                ->where('isActive', '=', 1)
                                ->selectRaw('DATEDIFF("'.$date->getDate.'", startDate) as days, startDate')
                                ->first();
                $plant = Manage::where('deviceId', '=', $value->deviceId)
                                ->select('plantId as id', 'startDate')
                                ->first();
                $plantName = Plant::where('id', '=', $plant->id)->select('name')->first();
                $res = [
                    'deviceId' => $value->deviceId,
                    'deviceName' => $value->nameDevice,
                    'plantName' =>  $plantName->name,
                    'message' => "Your device can't measure. Please check your device again",
                    'datetime' => $datetime->datetime,
                    'now' => $getNow->days,
                    'startDate' => $getNow->startDate
                ];
                array_push($sendData, $res);
            }
        }else {
            $object = [];
            foreach ($devices as $key => $device) {
                $getNow = Manage::where('deviceId', '=', $device->deviceId)
                                ->where('isActive', '=', 1)
                                ->selectRaw('DATEDIFF("'.$date->getDate.'", startDate) as days, startDate')
                                ->first();
                $plant = Manage::where('deviceId', '=', $device->deviceId)
                                ->select('plantId as id', 'startDate')
                                ->first();
                $plantName = Plant::where('id', '=', $plant->id)->select('name')->first();
                // $plant = Manage::join('plants', 'manages.plantId', '=', 'plants.id')
                //                 ->where('manages.deviceId', '=', $device->deviceId)
                //                 ->select('manages.plantId as id', 'manages.startDate', 'plants.name as plantName')
                //                 ->first();
                if(!isset($data[$device->deviceId])) {
                    $res = [
                        'deviceId' => $device->deviceId,
                        'deviceName' => $device->nameDevice,
                        'plantName' =>  $plantName->name,
                        'message' => "Your device can't measure. Please check your device again",
                        'datetime' => $datetime->datetime,
                        'now' => $getNow->days,
                        'startDate' => $getNow->startDate
                    ];
                    array_push($sendData, $res);
                }else {
                    $getData = $data[(string)$device->deviceId][count($data[$device->deviceId])-1];
                    // $plant = Manage::where('deviceId', '=', $device->deviceId)
                    //                 ->select('plantId as id', 'startDate')
                    //                 ->first();
                    // $plantName = Plant::where('id', '=', $plant->id)->select('name')->first();
                    $phases = Phase::where('plantId', '=', $plant->id)
                                    ->orderBy('id')
                                    ->get();
                    $deviceName = Device::where('id', '=', $device->deviceId)->select('name')->first();
                    for($j = 0; $j < count($phases); $j++){
                        if ($j == 0) $startDate = \Carbon\Carbon::parse($plant->startDate);
                        else $startDate = \Carbon\Carbon::parse($plant->startDate)->addDays($phases[$j-1]->days);
                        $endDate = \Carbon\Carbon::parse($plant->startDate)->addDays($phases[$j]->days);
                        if ($startDate < $now && $now < $endDate) {
                            $statusHumidity = $this->compareValue($phases[$j]->minHumidity, $phases[$j]->maxHumidity, $getData->humidity);
                            $statusTemperature = $this->compareValue($phases[$j]->minTemperature, $phases[$j]->maxTemperature, $getData->temperature);
                            $solution = $this->getSolution($statusHumidity, $statusTemperature, $phases[$j]->id);
                            $object = [
                                'message' => "OK",
                                'deviceId' => $getData->deviceId,
                                'solution' => $solution,
                                'data' => $getData,
                                'phase' => $phases[$j],
                                'datetime' => $datetime->datetime,
                                'plantName' => $plantName->name,
                                'deviceName' => $deviceName->name,
                                'now' => $getNow->days,
                                'startDate' => $getNow->startDate
                            ];
                            break;
                        }
                    }
                    array_push($sendData, $object);
                }
            }
        }
        return response()->json($sendData);
    } 
}
