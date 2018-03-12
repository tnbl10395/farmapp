<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Manage;
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
        // $user = JWTAuth::toUser($request->token);
        $manages = Manage::join('devices','manages.deviceId','=','devices.id')
                        ->where('userId',1)
                        ->select('manages.deviceId as id','devices.name')
                        ->orderBy('id')
                        ->get();
        if(count($manages) > 0){
            return response()->json($manages);
        }else{
            return response()->json('No data');
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
        $manage = new Manage();
        $manage->userId = $request->userId;
        $manage->deviceId = $request->deviceId;
        $manage->save();
        return response()->json('Successfull');
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
            return response()->json('No data');
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
        $manage = Manage::findOrFail($id);
        $manage->userId = $request->userId;
        $manage->deviceId = $request->deviceId;
        $manage->save();
        return response()->json('Updated');
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
        return response()->json('Deleted');
    }
}
