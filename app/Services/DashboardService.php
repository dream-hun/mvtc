<?php

namespace App\Services;

use App\Models\Department;
use App\Models\Student;
use Illuminate\Support\Collection;

class DashboardService
{
    /**
     * Get dashboard statistics including student counts and gender distribution
     */
    public static function getStatistics(): array
    {
        return [
            'totalStudents' => Student::count(),
            'maleStudents' => Student::where('gender', 'male')->count(),
            'femaleStudents' => Student::where('gender', 'female')->count(),
            'totalDepartments' => Department::where('status', 'active')->count(),
        ];
    }

    /**
     * Get the 5 most recently registered students
     */
    public static function getRecentStudents(): Collection
    {
        return Student::with('department')
            ->latest()
            ->limit(5)
            ->get();
    }
}