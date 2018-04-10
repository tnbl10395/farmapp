<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Manage;
use App\Device;
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
        $deviceId = Device::where('code',$request->code)
                            ->where('status', 0)   
                            ->select('deviceId')->first();
        $user = JWTAuth::toUser($request->header('token'));
        if ($deviceId != null) {
            $manage = new Manage();
            $manage->userId = $user->id;
            $manage->deviceId = $deviceId->deviceId;
            $manage->plantId = $request->plantId;
            $manage->isActive = '1';
            $manage->save();
            return response()->json($manage);
        }else {
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
}
