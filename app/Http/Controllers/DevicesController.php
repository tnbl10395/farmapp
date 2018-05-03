<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Device;
use App\Manage;
use App\Location;
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
            $devices = Device::all();
            return response()->json($devices);
        }else if($user->role == '0'){
            $device = Device::join('manages','devices.id','=','manages.deviceId')
                            ->join('users','manages.userId','=','users.id')
                            ->where('users.id',$user->id)
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
            $manage = new Manage();
            $manage->userId = $user->id;
            $manage->deviceId = $device->id;
            $manage->isActive = '0';
            $manage->save();
            if ($manage == true) {
                Device::where('id',$device->id)->update(['status' => '1']);
                return response()->json(true);
            }else {
                return response()->json(false);
            }
        }
    }
}
