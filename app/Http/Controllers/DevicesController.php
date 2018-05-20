<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Device;
use App\Manage;
use App\Location;
use App\Sensor;
use App\Data;
use JWTAuth;

class DevicesController extends Controller
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
            // $devices = Device::all();
            $devices = Device::leftJoin('users','devices.userId','=','users.id')
                            ->leftJoin('manages','devices.id','=','manages.deviceId')
                            ->select('devices.*', 'users.username', 'manages.isActive', 'manages.startDate')
                            ->orderBy('devices.id')
                            ->get();
            return response()->json($devices);
        }else if($user->role == '0'){
            $device = Device::leftJoin('manages','devices.id','=','manages.deviceId')
                            ->leftJoin('users','devices.userId','=','users.id')
                            ->where('users.id',$user->id)
                            ->select('devices.*', 'manages.isActive', 'manages.startDate')
                            ->get();
            return response()->json($device);
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
        $checkCode = Device::where('code',$request->code)->first();
        if($checkCode==null){
            $device = new Device();
            $device->name = $request->name;
            $device->code = $request->code;
            $device->manufacturing_date = $request->manufacturing_date;
            $device->status = '0';
            $device->save();
            return response()->json(true);
        }else{
            return response()->json(false);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $device = Device::findOrFail($id);
        return response()->json($device);
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
        $device = Device::findOrFail($id);
        $device->name = $request->name;
        $device->manufacturing_date = $request->manufacturing_date;
        $device->code = $request->code;
        $device->save();
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
        $sensor = Sensor::where('deviceId', $id)->delete();
        $manage = Manage::where('deviceId', $id)->delete();
        $location = Location::where('deviceId', $id)->delete();
        $device = Device::findOrFail($id);
        $device->delete();
        return response()->json($device);
    }

    public function userAddDevice(Request $request) 
    {
        $user = JWTAuth::toUser($request->header('token'));
        $device = Device::where('code',$request->code)
                            ->where('status','0')
                            ->select('id')
                            ->first();
        // $checkDevice = Manage::where('deviceId',$device->id)->first();
        if ($device == null) {
            return response()->json(false);
        }else {
            $manages = Manage::where('userId', $user->id)->count();
            $count = $manages + 1;
            $manage = new Manage();
            $manage->userId = $user->id;
            $manage->name = "Plot $count";
            $manage->deviceId = $device->id;
            $manage->isActive = '0';
            $manage->save();
            if ($manage == true) {
                Device::where('id',$device->id)->update(['userId'=>$user->id, 'status' => '1']);
                return response()->json(true);
            }else {
                return response()->json(false);
            }
        }
    }

    public function getListDevicesNoActive(Request $request) 
    {
        $user = JWTAuth::toUser($request->header('token'));
        if ($user->role == "0") {
            $devices = Device::leftJoin('manages', 'devices.id', '=', 'manages.deviceId')
                            ->where('devices.userId', $user->id)
                            ->where('manages.plantId', null)
                            ->where('manages.deviceId', null)
                            ->select('devices.*')
                            ->get();
            return response()->json($devices);
        }
    }

    public function deleteDeviceOfUser(Request $request, $id) 
    {
        $user = JWTAuth::toUser($request->header('token'));
        $location = Location::where('deviceId', $id)->delete();
        $manage = Manage::where('userId', $user->id)
                        ->where('deviceId', $id)
                        ->delete();      
        $data = Data::where('deviceId', $id)->delete();
        $device = Device::where('id', $id)->update(['userId'=>null, 'status' => '0']); 
        return response()->json(true);            
    }
}
