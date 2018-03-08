<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;

class DataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $datas = Data::join('devices','data.deviceId','=','devices.id')
                    ->select('data.*','devices.name')
                    ->get();
        if(count($datas) > 0){
            return response()->json($datas);
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
        $req = explode('-',$request->data);
        $data = new Data();
        $data->deviceId = $req[1];
        $data->humidity = $req[2];
        $data->temperature = $req[3];
        $data->latitude = $req[4];
        $data->longitude = $req[5];
        $data->status = 1;
        $data->save();
        return response()->json('Successfull!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Data::findOrFail($id);
        if(!is_null($data)){
            return response()->json($data);
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
        $data = Data::findOrFail($id);
        $data->userId = $request->userId;
        $data->deviceId = $request->deviceId;
        $data->save();
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
        $data = Data::findOrFail($id);
        $data->delete();
        return response()->json('Deleted');
    }
}
