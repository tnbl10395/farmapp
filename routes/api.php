<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('auth/login', 'UsersController@login');
// Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('user-info', 'UsersController@getUserInfo');
    //Devices
    Route::get('devices', 'DevicesController@index');
    Route::get('devices/{id}', 'DevicesController@show');
    Route::post('devices', 'DevicesController@store');
    Route::post('devices/{id}', 'DevicesController@update');
    Route::delete('devices/{id}', 'DevicesController@destroy');

    //Users
    Route::get('users', 'UsersController@index');
    Route::get('users/{id}', 'UsersController@show');
    Route::post('users', 'UsersController@store');
    Route::post('users/{id}', 'UsersController@update');
    Route::delete('users/{id}', 'UsersController@destroy');

    //Manages
    Route::get('manages', 'ManagesController@index');
    Route::get('manages/{id}', 'ManagesController@show');
    Route::post('manages', 'ManagesController@store');
    Route::post('manages/{id}', 'ManagesController@update');
    Route::delete('manages/{id}', 'ManagesController@destroy');

    //Solutions
    Route::get('solutions', 'SolutionsController@index');
    Route::get('solutions/{id}', 'SolutionsController@show');
    Route::post('solutions', 'SolutionsController@store');
    Route::post('solutions/{id}', 'SolutionsController@update');
    Route::delete('solutions/{id}', 'SolutionsController@destroy');

    //Data
    Route::get('data', 'DataController@index');
    Route::get('data/{id}', 'DataController@show');
    Route::post('data/{id}', 'DataController@update');
    Route::delete('data/{id}', 'DataController@destroy');
// });
Route::group(['middleware' => 'key'], function () {
    Route::get('send-data', 'DataController@store');
});
