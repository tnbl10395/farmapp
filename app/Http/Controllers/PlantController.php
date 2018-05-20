<?php

namespace App\Http\Controllers;

use App\Plant;
use App\Phase;
use App\Manage;
use App\Solution;
use Illuminate\Http\Request;
use JWTAuth;

class PlantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = JWTAuth::toUser($request->header('token'));
        $sendData = [];
        if($user->role == '1'){
            $plants = Plant::join('users','plants.userId','=','users.id')
                            ->selectRaw('plants.id, plants.name, plants.description, users.username, picture')
                            ->get();
            foreach ($plants as $key => $plant) {
                $totalDays = 0;
                $totalPhases = Phase::where('plantId', $plant->id)
                                ->selectRaw('COUNT(phases.id) as totalPhases')
                                ->first();
                $phases = Phase::where('plantId', $plant->id)->select('days')->get();
                foreach ($phases as $key => $phase) {
                    $totalDays = $totalDays + $phase->days;
                }
                $object = [
                    'id' => $plant->id,
                    'name' => $plant->name,
                    'description' => $plant->description,
                    'picture' => $plant->picture,
                    'totalPhases' => $totalPhases->totalPhases,
                    'username' => $plant->username,
                    'totalDays' => $totalDays
                ];
                array_push($sendData, $object);
            }
            return response()->json($sendData);
        }else{
            $plants = Plant::where('userId', $user->id)
                            ->selectRaw('plants.id, plants.name, plants.description, picture')
                            ->get();
            foreach ($plants as $key => $plant) {
                $totalDays = 0;
                $totalPhases = Phase::where('plantId', $plant->id)
                                ->selectRaw('COUNT(phases.id) as totalPhases')
                                ->first();
                $phases = Phase::where('plantId', $plant->id)->select('days')->get();
                foreach ($phases as $key => $phase) {
                    $totalDays = $totalDays + $phase->days;
                }
                $object = [
                    'id' => $plant->id,
                    'name' => $plant->name,
                    'description' => $plant->description,
                    'picture' => $plant->picture,
                    'totalPhases' => $totalPhases->totalPhases,
                    'totalDays' => $totalDays
                ];
                array_push($sendData, $object);
            }
            return response()->json($sendData);
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
        $user = JWTAuth::toUser($request->header('token'));
        $plant = new Plant();
        $object = new Plant($request->plant);
        $plant->name = $object->name;
        $plant->picture = $request->picture;
        $plant->userId = $user->id;
        $plant->description = $object->description;
        $plant->save();
        $this->addPhase($request->phase, $plant->id);
        return response()->json(true);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Plant  $plant
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $plant = Plant::where('plants.id', $id)
                    ->selectRaw('plants.id, plants.name, plants.description, picture')
                    ->get();

        $phases = Phase::where('phases.plantId', $id)
                    ->get();

        $sendData = [
            'plant' => $plant,
            'phases' => $phases
        ];

        return response()->json($sendData);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Plant  $plant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $plant = Plant::findOrFail($id);
        $plant->name = $request->name;
        $plant->picture = $request->picture;
        $plant->description = $request->description;
        $plant->save();
        return response()->json($plant);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Plant  $plant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = JWTAuth::toUser($request->header('token'));
        $manage = Manage::where('userId', $user->id)
                        ->where('plantId', $id)
                        ->where('isActive', '1')
                        ->first();
        if ($manage == null) {
            $plant = Plant::findOrFail($id);
            $plant->delete();
            return response()->json(true);
        }else {
            return response()->json(false);
        }
    }

    public function getListPlant(Request $request) {
        $user = JWTAuth::toUser($request->header('token'));
        $sendData = [];
        $totalDayofPlants = 0;
        if ($user->role == "1") {
            $manages = Manage::join('plants', 'manages.plantId', '=', 'plants.id')
                        ->join('devices', 'manages.deviceId', '=', 'devices.id')
                        ->where('manages.isActive', "1")
                        ->select('manages.id as manageId', 'manages.deviceId', 'manages.plantId', 'manages.startDate', 'manages.endDate',
                                'plants.name as plantName', 'plants.description as plantDescription', 'devices.name as deviceName')
                        ->get();
            foreach ($manages as $key => $object) {
                $phases = Phase::where('plantId', $object->plantId)->get();
                $countPhase = count($phases);
                foreach ($phases as $key => $value) {
                    $totalDayofPlants = $totalDayofPlants + $value->days;
                }
                array_push($sendData, [
                    'manageId' => $object->manageId,
                    'deviceId' => $object->deviceId,
                    'plantId' => $object->plantId,
                    'startDate' => $object->startDate,
                    'endDate' => $object->endDate,
                    'plantName' => $object->plantName,
                    'description' => $object->description,
                    'deviceName' => $object->deviceName,
                    'totalPhase' => $countPhase,
                    'totalPlant' => $totalDayofPlants
                ]);
            }
            return response()->json($sendData);
        }else {
            $manages = Manage::join('plants', 'manages.plantId', '=', 'plants.id')
                        ->join('devices', 'manages.deviceId', '=', 'devices.id')
                        ->where('manages.userId', $user->id)
                        ->where('manages.isActive', "1")
                        ->select('manages.id as manageId', 'manages.deviceId', 'manages.plantId', 'manages.startDate', 'manages.endDate',
                                'plants.name as plantName', 'plants.description as plantDescription', 'devices.name as deviceName')
                        ->get();
            foreach ($manages as $key => $object) {
                $phases = Phase::where('plantId', $object->plantId)->get();
                $countPhase = count($phases);
                foreach ($phases as $key => $value) {
                    $totalDayofPlants = $totalDayofPlants + $value->days;
                }
                array_push($sendData, [
                    'manageId' => $object->manageId,
                    'deviceId' => $object->deviceId,
                    'plantId' => $object->plantId,
                    'startDate' => $object->startDate,
                    'endDate' => $object->endDate,
                    'plantName' => $object->plantName,
                    'description' => $object->description,
                    'deviceName' => $object->deviceName,
                    'totalPhase' => $countPhase,
                    'totalPlant' => $totalDayofPlants
                ]);
            }
            return response()->json($sendData);
        }
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
}
