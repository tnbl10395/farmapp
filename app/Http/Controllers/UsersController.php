<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\Controller;
use JWTAuthException;
use JWTAuth;
use Hash;

class UsersController extends Controller
{
    private $user;

    public function __construct(User $user){
        $this->user = $user;
    }

    // public function register(Request $request){
    //     $user = $this->user->create([
    //       'name' => $request->get('name'),
    //       'email' => $request->get('email'),
    //       'password' => Hash::make($request->get('password'))
    //     ]);
        
    //     return response()->json([
    //         'status'=> 200,
    //         'message'=> 'User created successfully',
    //         'data'=>$user
    //     ]);
    // }

    public function login(Request $request){
        $credentials = $request->only('username', 'password');
        $token = null;
        try {
           if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['invalid_username_or_password'], 422);
           }
        } catch (JWTAuthException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    public function getUserInfo(Request $request){
        $user = JWTAuth::toUser($request->header('token'));
        return response()->json(['result' => $user]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $users = User::select('id','username','fullname','address','phone', 'role')->get();
        if(count($users) > 0){
            return response()->json($users);
        }else{
            return response()->json(null);
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
        $checkUsername = User::where('username',$request->username)->select('username')->first();
        if($checkUsername==null) {
            $user = new User();
            $user->username = $request->username;
            $user->password = Hash::make($request->password);
            $user->fullname = $request->fullname;
            $user->address = $request->address;
            $user->phone = $request->phone;
            $user->role = $request->role;
            $user->save();
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
        $user = User::findOrFail($id);
        if(!is_null($user)){
            return response()->json($user);
        }else{
            return response()->json('nodata');
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
        $user = User::findOrFail($id);
        // $users->username = $request->username;
        // $users->password = bcrypt($request->password);
        $user->fullname = $request->fullname;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->role = $request->role;
        $user->save();
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
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json($user);
    }
}
