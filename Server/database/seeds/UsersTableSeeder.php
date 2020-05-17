<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = new \App\User;
        $user1->firstname = 'Hansi';
        $user1->lastname = 'Hinterseer';
        $user1->address = 'Softwarepark 11, 4232 Hagenberg';
        $user1->email = 'test@helper.at';
        $user1->password = bcrypt('helper');
        $user1->role = 'helper';
        $user1->save();

        $user2 = new \App\User;
        $user2->firstname = 'Michael';
        $user2->lastname = 'Wendler';
        $user2->address = 'Schloßpark 11, 4232 Hagenberg';
        $user2->email = 'test@creator.at';
        $user2->password = bcrypt('creator');
        $user2->role = 'creator';
        $user2->save();

        $user3 = new \App\User;
        $user3->firstname = 'Bilbo';
        $user3->lastname = 'Beutlin';
        $user3->address = 'Schloßpark 15, 4232 Hagenberg';
        $user3->email = 'BB@test.at';
        $user3->password = bcrypt('secret2');
        $user3->role = 'helper';
        $user3->save();

        $user4 = new \App\User;
        $user4->firstname = 'Andreas';
        $user4->lastname = 'Gabalier';
        $user4->address = 'Aisstal 12, 4232 Hagenberg';
        $user4->email = 'AG@test.at';
        $user4->password = bcrypt('secret3');
        $user4->role = 'creator';
        $user4->save();
    }
}
