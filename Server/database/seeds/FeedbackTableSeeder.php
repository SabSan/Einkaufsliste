<?php

use Illuminate\Database\Seeder;

class FeedbackTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $feedback = new App\Feedback;
        $feedback->body = "Ein Text zum Kommentar";

        $user = App\User::all()->first();
        $feedback->user()->associate($user);

        $shoppinglist = App\Shoppinglist::all()->first();
        $feedback->shoppinglist()->associate($shoppinglist);
        $feedback->save();

    }
}
