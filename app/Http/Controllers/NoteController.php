<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = JWTAuth::toUser($request->header('token'));
        if ($user->role == "0") {
            $notes = Note::where('userId', $user->id)->get();
            return response()->json($notes);
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
        $user = JWTAuth::toUser($request->header('token'));
        $note = new Note();
        $note->userId = $user->id;
        $note->sumary = $request->sumary;
        $note->description = $request->description;
        $note->datetime = $request->datetime;
        $note->save();
        return response()->json(true);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $note = Note::findOrFail($id);
        return response()->json($note);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = JWTAuth::toUser($request->header('token'));
        $note = Note::findOrFail($id);
        $note->userId = $user->id;
        $note->sumary = $request->sumary;
        $note->description = $request->description;
        $note->datetime = $request->datetime;
        $note->save();
        return response()->json($note);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();
        return response()->json(true);
    }
}
