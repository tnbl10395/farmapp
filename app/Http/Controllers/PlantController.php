<?php

namespace App\Http\Controllers;

use App\Plant;
use App\Phase;
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
        if($user->role == '1'){
            $plants = Plant::join('users','plants.userId','=','users.id')
                            ->selectRaw('plants.id, plants.name, plants.description, users.username, TO_BASE64(plants.picture) as picture')
                            ->get();
            return response()->json($plants);
        }else{
            $plants = Plant::where('userId', $user->id)
                            ->selectRaw('plants.id, plants.name, plants.description, TO_BASE64(plants.picture) as picture')
                            ->get();
            return response()->json($plants);
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
        $plant = new Plant();
        $plant->name = $request->name;
        $plant->picture = $request->picture;
        $plant->save();
        return response()->json($plant);
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
                    ->selectRaw('plants.id, plants.name, plants.description, TO_BASE64(plants.picture) as picture')
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
        $plant->save();
        return response()->json($plant);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Plant  $plant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Plant $plant)
    {
        $plant = Plant::findOrFail($id);
        $plant->delete();
        return response()->json($plant);
    }
}
