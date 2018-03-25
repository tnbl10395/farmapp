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
        $deviceId = Device::where('code',$request->code)->select('deviceId')->first();
        $manage = new Manage();
        $manage->userId = $request->userId;
        $manage->deviceId = $deviceId->deviceId;
        $manage->save();

        return response()->json([$message=>'successfull']);
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
            return response()->json([$message=>'nodata']);
        }
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
        // $deviceId = Device::where('code',$request->code)->select('deviceId')->first();
        // $manage = Manage::findOrFail($id);
        // $manage->userId = $request->userId;
        // $manage->deviceId = $deviceId->deviceId;
        // $manage->save();
        // return response()->json([$message=>'updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $manage = Manage::findOrFail($id);
        $manage->delete();
        return response()->json($manage);
    }
}
