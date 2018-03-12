<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use App\Manage;
use JWTAuth;

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
                    ->select('data.*','devices.name')->orderBy('id','asc')
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
        // $data = Data::findOrFail($id);
        // $data->userId = $request->userId;
        // $data->deviceId = $request->deviceId;
        // $data->save();
        // return response()->json('Updated');
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
    //real - hour
    public function getRealChartBasedOnHour(Request $request, $deviceId)
    {   
        $array = [];
        // $device = Manage::where('userId',$user->id)->select('deviceId as id')->orderBy('deviceId','asc')->first();
        $date = date('Y-m-d H');
        $data = Data::join('devices','data.deviceId','=','devices.id')
                    // ->whereRaw('data.updated_at LIKE "'.$date.'%"')
                    ->whereRaw('substr(data.updated_at,1,13) = "'.$date.'"')
                    ->where('deviceId',$deviceId)
                    ->selectRaw('data.id,data.deviceId,devices.name,substr(data.updated_at,1,16) as minute,
                            data.humidity,data.temperature,data.updated_at')
                    ->orderBy('id','asc')->get()->groupBy('minute'); 
        foreach ($data as $key => $value) {
            array_push($array,$value[count($value)-1]);
        }
        return response()->json($array);
    }
    //real - day
    public function getRealChartBasedOnDay(Request $request, $deviceId)
    {   
        $array = [];
        // $device = Manage::where('userId',$user->id)->select('deviceId as id')->orderBy('deviceId','asc')->first();
        $date = date('Y-m-d');
        $data = Data::join('devices','data.deviceId','=','devices.id')
                    // ->whereRaw('data.updated_at LIKE "'.$date.'%"')
                    ->whereDate('data.updated_at',$date)
                    ->where('deviceId',$deviceId)
                    ->selectRaw('data.id,data.deviceId,devices.name,substr(data.updated_at,1,13) as hour,
                            data.humidity,data.temperature,data.updated_at')
                    ->orderBy('id','asc')->get()->groupBy('hour'); 
        foreach ($data as $key => $value) {
            array_push($array,$value[count($value)-1]);
        }
        return response()->json($array);
    }
    //old-hour
    public function getOldChartBasedOnHour(Request $request)
    {
        // return response()->json($request);
        $array = [];
        $data = Data::join('devices','data.deviceId','=','devices.id')
        ->whereRaw('substr(data.updated_at,1,13) = "'.$request->hour.'"')
        ->where('deviceId',$request->deviceId)
        ->selectRaw('data.id,data.deviceId,devices.name,substr(data.updated_at,1,16) as minute,
                    substr(data.updated_at,15,2) as min,data.humidity,data.temperature,data.updated_at')
        ->orderBy('id','asc')->get()->groupBy('minute'); 
        foreach ($data as $key => $value) {
            array_push($array,$value[count($value)-1]);
        }
        return response()->json($array);
    }
    //old-day
    public function getOldChartBasedOnDay(Request $request)
    {
        $array = [];
        $data = Data::join('devices','data.deviceId','=','devices.id')
        ->whereDate('data.updated_at',$request->day)
        ->where('deviceId',$request->deviceId)
        ->selectRaw('data.id,data.deviceId,devices.name,substr(data.updated_at,1,13) as hour, 
                substr(data.updated_at,12,2) as h, data.humidity,data.temperature,data.updated_at')
        ->orderBy('id','asc')->get()->groupBy('hour'); 
        foreach ($data as $key => $value) {
            array_push($array,$value[count($value)-1]);
        }
        return response()->json($array);
    }
    //one-minute
    public function getOneValueBasedOnMinute(Request $request)
    {
        $array = [];
        $data = Data::join('devices','data.deviceId','=','devices.id')
        ->whereRaw('substr(data.updated_at,1,16) = "'.$request->minute.'"')
        ->where('deviceId',$request->deviceId)
        ->selectRaw('data.id,data.deviceId,devices.name, substr(data.updated_at,15,2) as minute,
                data.humidity,data.temperature,data.updated_at')
        ->orderBy('id','desc')->first(); 
        return response()->json($data);
    }
    //one-hour
    public function getOneValueBasedOnHour(Request $request)
    {
        $array = [];
        $data = Data::join('devices','data.deviceId','=','devices.id')
        ->whereDate('data.updated_at',$request->hour)
        ->where('deviceId',$request->deviceId)
        ->selectRaw('data.id,data.deviceId,devices.name, substr(data.updated_at,12,2) as hour,
                data.humidity,data.temperature,data.updated_at')
        ->orderBy('id','desc')->first(); 
        return response()->json($data);
    }
}
