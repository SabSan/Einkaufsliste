<?php

use Illuminate\Http\Request;
use App\Shoppinglist;

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

/* Route::get('lists', 'ShoppinglistController@index');
Route::get('list/{id}', 'ShoppinglistController@findListById');
Route::get('list/checkid/{id}', 'ShoppinglistController@checkId');
Route::get('user/{id}', 'ShoppinglistController@findUserById');
Route::get('creator/{id}', 'ShoppinglistController@findListByCreatorId');
Route::get('helper/{id}', 'ShoppinglistController@findListByHelperId');
Route::get('lists', 'ShoppinglistController@findListWithoutHelperId');

Route::put('list/{id}', 'ShoppinglistController@updateList');
Route::put('feedback/{id}', 'ShoppinglistController@saveFeedback'); */

Route::group(['middleware' => [ 'api' , 'cors' ]], function () {
    Route::post( 'auth/login' , 'Auth\ApiAuthController@login');

    Route::get('list/{id}', 'ShoppinglistController@findListById');
    Route::get('list/checkid/{id}', 'ShoppinglistController@checkId');
    Route::get('user/{id}', 'ShoppinglistController@findUserById');
    Route::get('creator/{id}', 'ShoppinglistController@findListByCreatorId');
    Route::get('helper/{id}', 'ShoppinglistController@findListByHelperId');
    Route::get('lists', 'ShoppinglistController@findListWithoutHelperId');

});

Route::group(['middleware' => ['api', 'cors', 'auth.jwt']], function (){
    Route::post('list', 'ShoppinglistController@saveList');
    Route::post( 'auth/logout' , 'Auth\ApiAuthController@logout');
    Route::delete('list/{id}', 'ShoppinglistController@delete');

    Route::put('list/{id}', 'ShoppinglistController@updateList');
    Route::put('feedback/{id}', 'ShoppinglistController@saveFeedback');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
