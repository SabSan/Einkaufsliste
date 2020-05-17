<?php

use Illuminate\Database\Seeder;

class ListentriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $listentry1 = new \App\Listentry;
        $listentry1->description = 'Banane';
        $listentry1->amount = '1';
        $listentry1->max_price = 3;

        $list = App\Shoppinglist::all()->first();
        $listentry1->shoppinglist()->associate($list);
        $listentry1->save();

    }
}
