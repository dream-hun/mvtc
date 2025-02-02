<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Liliane BYUKUSENGE',
                'email' => 'internmvtc@fmorwanda.org',
                'password' => Hash::make('Mvtc@2025Intake'),
            ],
            [
                'name' => 'NSABIMANA Isaie',
                'email' => 'registration@fmorwanda.org',
                'password' => Hash::make('Mvtc@2025Intake'),
            ],

        ];
        User::insert($users);
    }
}
