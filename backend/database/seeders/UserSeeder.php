<?php

namespace Database\Seeders;

use App\Modules\Core\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123123123'),
            'role' => 1,
        ]);

        User::create([
            'name' => 'User_1',
            'username' => 'user_1',
            'email' => 'user_1@gmail.com',
            'password' => Hash::make('123123123'),
            'role' => 2,
        ]);
    }
}
