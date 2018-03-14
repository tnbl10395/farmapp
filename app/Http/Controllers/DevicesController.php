<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Device;

class DevicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $devices = Device::all();
        if(count($devices) > 0){
            return response()->json($devices);
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
    public function show($id)
    {
        $device = Device::findOrFail($id);
        if(!is_null($device)){
            return response()->json($device);
        }else{
            return response()->json('message','nodata');
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
        $device = Device::findOrFail($id);
        $device->name = $request->name;
        $device->manufacturing_date = $request->manufacturing_date;
        $device->status = $request->status;
        $device->save();
        return response()->json('message','updated');
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
        return response()->json('message','deleted');
    }
}
