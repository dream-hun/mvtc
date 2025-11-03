<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardIntegrationTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
    }

    public function test_dashboard_displays_complete_statistics_flow()
    {
        // Create test data
        $activeDepartment = Department::factory()->create(['status' => 'active']);
        $inactiveDepartment = Department::factory()->create(['status' => 'inactive']);

        // Create students with different genders
        Student::factory()->count(5)->create([
            'gender' => 'male',
            'department_id' => $activeDepartment->id
        ]);
        Student::factory()->count(3)->create([
            'gender' => 'female',
            'department_id' => $activeDepartment->id
        ]);
        Student::factory()->count(2)->create([
            'gender' => 'other',
            'department_id' => $activeDepartment->id
        ]);

        $response = $this->actingAs($this->user)->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Dashboard')
                ->where('statistics.totalStudents', 10)
                ->where('statistics.maleStudents', 5)
                ->where('statistics.femaleStudents', 3)
                ->where('statistics.totalDepartments', 1) // Only active departments
                ->has('recentStudents', 5) // Should show 5 most recent
        );
    }

    public function test_dashboard_shows_recent_students_with_department_info()
    {
        $department = Department::factory()->create([
            'name' => 'Computer Science',
            'status' => 'active'
        ]);

        $student = Student::factory()->create([
            'name' => 'John Doe',
            'department_id' => $department->id
        ]);

        $response = $this->actingAs($this->user)->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('recentStudents.0.name', 'John Doe')
                ->where('recentStudents.0.department.name', 'Computer Science')
        );
    }

    public function test_dashboard_handles_empty_data_gracefully()
    {
        $response = $this->actingAs($this->user)->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Dashboard')
                ->where('statistics.totalStudents', 0)
                ->where('statistics.maleStudents', 0)
                ->where('statistics.femaleStudents', 0)
                ->where('statistics.totalDepartments', 0)
                ->has('recentStudents', 0)
        );
    }

    public function test_student_listing_with_sorting_and_pagination_integration()
    {
        $department = Department::factory()->create(['status' => 'active']);
        
        // Create students with specific names for sorting test
        Student::factory()->create([
            'name' => 'Alice Johnson',
            'email' => 'alice@example.com',
            'department_id' => $department->id
        ]);
        Student::factory()->create([
            'name' => 'Bob Smith',
            'email' => 'bob@example.com',
            'department_id' => $department->id
        ]);
        Student::factory()->create([
            'name' => 'Charlie Brown',
            'email' => 'charlie@example.com',
            'department_id' => $department->id
        ]);

        // Test sorting by name ascending
        $response = $this->actingAs($this->user)->get(route('students.index', [
            'sort' => 'name',
            'direction' => 'asc'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Students/Index')
                ->where('students.data.0.name', 'Alice Johnson')
                ->where('students.data.1.name', 'Bob Smith')
                ->where('students.data.2.name', 'Charlie Brown')
                ->where('filters.sort', 'name')
                ->where('filters.direction', 'asc')
        );

        // Test search functionality
        $searchResponse = $this->actingAs($this->user)->get(route('students.index', [
            'search' => 'Alice'
        ]));

        $searchResponse->assertStatus(200);
        $searchResponse->assertInertia(fn ($page) => 
            $page->has('students.data', 1)
                ->where('students.data.0.name', 'Alice Johnson')
                ->where('filters.search', 'Alice')
        );
    }

    public function test_department_listing_with_sorting_and_search_integration()
    {
        // Create departments with specific names for testing
        Department::factory()->create([
            'name' => 'Biology',
            'status' => 'active',
            'duration' => '4 years'
        ]);
        Department::factory()->create([
            'name' => 'Computer Science',
            'status' => 'active',
            'duration' => '4 years'
        ]);
        Department::factory()->create([
            'name' => 'Mathematics',
            'status' => 'inactive',
            'duration' => '3 years'
        ]);

        // Test sorting by name
        $response = $this->actingAs($this->user)->get(route('departments.index', [
            'sort' => 'name',
            'direction' => 'asc'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Departments/Index')
                ->where('departments.data.0.name', 'Biology')
                ->where('departments.data.1.name', 'Computer Science')
                ->where('departments.data.2.name', 'Mathematics')
        );

        // Test search functionality
        $searchResponse = $this->actingAs($this->user)->get(route('departments.index', [
            'search' => 'Computer'
        ]));

        $searchResponse->assertStatus(200);
        $searchResponse->assertInertia(fn ($page) => 
            $page->has('departments.data', 1)
                ->where('departments.data.0.name', 'Computer Science')
        );

        // Test sorting by status
        $statusResponse = $this->actingAs($this->user)->get(route('departments.index', [
            'sort' => 'status',
            'direction' => 'asc'
        ]));

        $statusResponse->assertStatus(200);
        $statusResponse->assertInertia(fn ($page) => 
            $page->where('departments.data.0.status', 'active')
                ->where('departments.data.2.status', 'inactive')
        );
    }

    public function test_pagination_maintains_filters_across_pages()
    {
        $department = Department::factory()->create(['status' => 'active']);
        
        // Create 15 students to trigger pagination
        Student::factory()->count(15)->create([
            'name' => 'Test Student',
            'department_id' => $department->id
        ]);

        // Test first page with filters
        $response = $this->actingAs($this->user)->get(route('students.index', [
            'search' => 'Test',
            'sort' => 'name',
            'direction' => 'asc',
            'page' => 1
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('students.current_page', 1)
                ->where('students.last_page', 2)
                ->where('filters.search', 'Test')
                ->where('filters.sort', 'name')
                ->where('filters.direction', 'asc')
        );

        // Test second page maintains filters
        $page2Response = $this->actingAs($this->user)->get(route('students.index', [
            'search' => 'Test',
            'sort' => 'name',
            'direction' => 'asc',
            'page' => 2
        ]));

        $page2Response->assertStatus(200);
        $page2Response->assertInertia(fn ($page) => 
            $page->where('students.current_page', 2)
                ->where('filters.search', 'Test')
                ->where('filters.sort', 'name')
                ->where('filters.direction', 'asc')
        );
    }
}