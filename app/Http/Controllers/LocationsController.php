<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;
use App\Manage;
use JWTAuth;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = JWTAuth::toUser($request->header('token'));
        $locations = [];
        $devices = [];
        if($user->role == '1'){
            $device = Manage::where('isActive', '=', 1)
                            ->select('deviceId as id')
                            ->get();
            if ($device != null) {
                foreach($device as $key => $value) {
                    array_push($devices, $value->id);
                }
            }
            $location = Location::join('devices', 'locations.deviceId', '=', 'devices.id')
                                ->join('manages', 'devices.id', '=', 'manages.deviceId')
                                ->join('plants', 'manages.plantId', '=', 'plants.id')
                                ->whereIn('manages.deviceId', $devices)
                                ->select('locations.*', 'plants.id as plantId', 'plants.name as namePlant', 'plants.description as descriptionPlant',
                                        'manages.startDate', 'manages.endDate', 'devices.name')
                                ->get()->groupBy('deviceId');
            if ($location != null) {
                foreach($location as $key => $value) {
                    array_push($locations, $value[count($value)-1]);
                }
            }
            return response()->json($locations);            
        }else {
            $device = Manage::where('userId', '=', $user->id)
                            ->where('isActive', '=', 1)
                            ->select('deviceId as id')
                            ->get();
            if ($device != null) {
                foreach($device as $key => $value) {
                    array_push($devices, $value->id);
                }
            }
            $location = Location::join('devices', 'locations.deviceId', '=', 'devices.id')
                                ->join('manages', 'devices.id', '=', 'manages.deviceId')
                                ->join('plants', 'manages.plantId', '=', 'plants.id')
                                ->whereIn('manages.deviceId', $devices)
                                ->select('locations.*', 'plants.id as plantId', 'plants.name as namePlant', 'plants.description as descriptionPlant',
                                        'manages.startDate', 'manages.endDate', 'devices.name')
                                ->get()->groupBy('deviceId');
            if ($location != null) {
                foreach($location as $key => $value) {
                    array_push($locations, $value[count($value)-1]);
                }
            }
            return response()->json($locations);         }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $req = explode('-',$request->data);
        $location = new Location();
        $location->deviceId = $req[1];
        $location->latitude = $req[2];
        $location->longitude = $req[3];
        $location->save();
        return response()->json("Successful");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $locations = Location::where('deviceId',$id)->orderBy('updated_at', 'desc')->first();
        return response()->json($locations);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
