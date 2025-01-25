<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'name' => 'Masonry',
                'status' => 'active',
                'created_at' => now(),
            ],
            [
                'name' => 'Hairdressing and Beauty Aesthetics',
                'status' => 'active',
                'created_at' => now(),
            ],
            [
                'name' => 'Tailoring and Fashion Design',
                'status' => 'active',
                'created_at' => now(),
            ],
            [
                'name' => 'Welding and Metal Works',
                'status' => 'active',
                'created_at' => now(),
            ],
            [
                'name' => 'Autoengine Repair & Automotive Technology',
                'status' => 'active',
                'created_at' => now(),
            ],
            [
                'name' => 'Multimedia',
                'status' => 'active',
                'created_at' => now(),
            ],

        ];
        Department::insert($projects);
    }
}
