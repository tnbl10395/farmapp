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
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('user-info', 'UsersController@getUserInfo');
    //Devices
    Route::get('devices', 'DevicesController@index');
    Route::get('devices/{id}', 'DevicesController@show');
    Route::post('devices', 'DevicesController@store');
    Route::post('user-add-device', 'DevicesController@userAddDevice');
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
    Route::post('delete-manages', 'ManagesController@destroy');
    Route::get('get-detail-device/{deviceId}', 'ManagesController@getDetailInformationDevices');

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
    Route::get('data-real-chart-hour/{deviceId}', 'DataController@getRealChartBasedOnHour');
    Route::get('data-real-chart-day/{deviceId}', 'DataController@getRealChartBasedOnDay');
    Route::post('data-old-chart-hour', 'DataController@getOldChartBasedOnHour');
    Route::post('data-old-chart-day', 'DataController@getOldChartBasedOnDay');
    Route::post('one-real-chart-hour','DataController@getOneValueBasedOnMinute');
    Route::post('one-real-chart-day','DataController@getOneValueBasedOnHour');
    Route::get('current-data/{id}', 'DataController@getCurrentValue');

    //plant
    Route::get('plants', 'PlantController@index');
    Route::get('plants/{id}', 'PlantController@show');
    Route::post('plants', 'PlantController@store');
    Route::post('plants/{id}', 'PlantController@update');
    Route::delete('plants/{id}', 'PlantController@destroy');

    //Location 
    Route::get('location/{id}','LocationsController@show');
});
Route::group(['middleware' => 'key'], function () {
    Route::get('send-data', 'DataController@store');
    Route::get('send-location','LocationsController@store');
});
