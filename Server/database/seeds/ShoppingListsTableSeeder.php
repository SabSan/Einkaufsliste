<?php

use Illuminate\Database\Seeder;

class ShoppingListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $helper = new App\User;
        $creator = new App\User;
        $users = \App\User::all();

        foreach ($users as $u){
            if($u->role === 'helper'){
                $helper = $u;
            }
            else if($u->role === 'creator'){
                $creator = $u;
            }
        }

        $list1 = new \App\Shoppinglist;
        $list1->title = 'Liste 1';
        $list1->bought_until = "2020-05-11";
        $list1->creator()->associate($creator);
        $list1->helper()->associate($helper);
        $list1->save();

        $list2 = new \App\Shoppinglist;
        $list2->title = 'Liste von Franz';
        $list2->bought_until = "2020-05-01";
        $list2->creator()->associate($creator);
        //$list2->helper()->associate($helper);
        $list2->save();


    }
}
