<?php

namespace Tests\Unit;

use App\Models\Department;
use App\Models\Student;
use App\Services\DashboardService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_statistics_returns_correct_counts()
    {
        // Create test departments
        $activeDepartment = Department::factory()->create(['status' => 'active']);
        $inactiveDepartment = Department::factory()->create(['status' => 'inactive']);

        // Create test students
        Student::factory()->count(10)->create([
            'gender' => 'male',
            'department_id' => $activeDepartment->id
        ]);
        Student::factory()->count(8)->create([
            'gender' => 'female',
            'department_id' => $activeDepartment->id
        ]);
        Student::factory()->count(2)->create([
            'gender' => 'other',
            'department_id' => $activeDepartment->id
        ]);

        $statistics = DashboardService::getStatistics();

        $this->assertEquals(20, $statistics['totalStudents']);
        $this->assertEquals(10, $statistics['maleStudents']);
        $this->assertEquals(8, $statistics['femaleStudents']);
        $this->assertEquals(1, $statistics['totalDepartments']); // Only active departments
    }

    public function test_get_statistics_returns_zero_when_no_data()
    {
        $statistics = DashboardService::getStatistics();

        $this->assertEquals(0, $statistics['totalStudents']);
        $this->assertEquals(0, $statistics['maleStudents']);
        $this->assertEquals(0, $statistics['femaleStudents']);
        $this->assertEquals(0, $statistics['totalDepartments']);
    }

    public function test_get_recent_students_returns_latest_five()
    {
        $department = Department::factory()->create(['status' => 'active']);
        
        // Create 10 students
        $students = Student::factory()->count(10)->create([
            'department_id' => $department->id
        ]);

        $recentStudents = DashboardService::getRecentStudents();

        $this->assertCount(5, $recentStudents);
        
        // Should return the 5 most recent students (latest created_at)
        $expectedIds = $students->sortByDesc('created_at')->take(5)->pluck('id')->toArray();
        $actualIds = $recentStudents->pluck('id')->toArray();
        
        $this->assertEquals($expectedIds, $actualIds);
    }

    public function test_get_recent_students_includes_department_relationship()
    {
        $department = Department::factory()->create(['status' => 'active']);
        Student::factory()->create(['department_id' => $department->id]);

        $recentStudents = DashboardService::getRecentStudents();

        $this->assertTrue($recentStudents->first()->relationLoaded('department'));
        $this->assertEquals($department->name, $recentStudents->first()->department->name);
    }

    public function test_get_recent_students_returns_empty_when_no_students()
    {
        $recentStudents = DashboardService::getRecentStudents();

        $this->assertCount(0, $recentStudents);
    }
}