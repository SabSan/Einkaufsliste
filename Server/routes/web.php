<?php

use App\Shoppinglist;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/shoppinglists', function () {

    //$lists = DB::table('lists')->get();

    $lists = Shoppinglist::all();
    return view('shoppinglists.index', compact('lists'));
});

Route::get('/shoppinglists/{id}', function ($id) {

    //$list = DB::table('lists')->find($id);
    $list = Shoppinglist::find($id);
    return view('shoppinglists.showlists', compact('list'));
}); */

Route::get('/', 'ShoppinglistController@index');
Route::get('/lists', 'ShoppinglistController@index');
Route::get('/lists/{list}', 'ShoppinglistController@show');

