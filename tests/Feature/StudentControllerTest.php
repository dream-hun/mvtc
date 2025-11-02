<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Department $department;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->department = Department::factory()->create(['status' => 'active']);
    }

    public function test_index_displays_students_with_pagination()
    {
        Student::factory()->count(15)->create(['department_id' => $this->department->id]);

        $response = $this->actingAs($this->user)->get(route('students.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Students/Index')
                ->has('students.data', 10) // Default pagination
                ->where('students.current_page', 1)
                ->where('students.last_page', 2)
        );
    }

    public function test_index_sorts_students_by_name_ascending()
    {
        $studentB = Student::factory()->create([
            'name' => 'Bob Smith',
            'department_id' => $this->department->id
        ]);
        $studentA = Student::factory()->create([
            'name' => 'Alice Johnson',
            'department_id' => $this->department->id
        ]);

        $response = $this->actingAs($this->user)->get(route('students.index', [
            'sort' => 'name',
            'direction' => 'asc'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('students.data.0.name', 'Alice Johnson')
                ->where('students.data.1.name', 'Bob Smith')
        );
    }

    public function test_index_sorts_students_by_name_descending()
    {
        $studentB = Student::factory()->create([
            'name' => 'Bob Smith',
            'department_id' => $this->department->id
        ]);
        $studentA = Student::factory()->create([
            'name' => 'Alice Johnson',
            'department_id' => $this->department->id
        ]);

        $response = $this->actingAs($this->user)->get(route('students.index', [
            'sort' => 'name',
            'direction' => 'desc'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('students.data.0.name', 'Bob Smith')
                ->where('students.data.1.name', 'Alice Johnson')
        );
    }

    public function test_index_searches_students_by_name()
    {
        Student::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'department_id' => $this->department->id
        ]);
        Student::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'department_id' => $this->department->id
        ]);

        $response = $this->actingAs($this->user)->get(route('students.index', [
            'search' => 'John'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->has('students.data', 1)
                ->where('students.data.0.name', 'John Doe')
        );
    }

    public function test_index_searches_students_by_email()
    {
        Student::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'department_id' => $this->department->id
        ]);
        Student::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'department_id' => $this->department->id
        ]);

        $response = $this->actingAs($this->user)->get(route('students.index', [
            'search' => 'jane@example.com'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->has('students.data', 1)
                ->where('students.data.0.email', 'jane@example.com')
        );
    }

    public function test_index_maintains_filters_in_response()
    {
        Student::factory()->create(['department_id' => $this->department->id]);

        $response = $this->actingAs($this->user)->get(route('students.index', [
            'search' => 'test',
            'sort' => 'name',
            'direction' => 'desc'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('filters.search', 'test')
                ->where('filters.sort', 'name')
                ->where('filters.direction', 'desc')
        );
    }

    public function test_index_prevents_sql_injection_in_sort_field()
    {
        Student::factory()->create(['department_id' => $this->department->id]);

        $response = $this->actingAs($this->user)->get(route('students.index', [
            'sort' => 'name; DROP TABLE students;',
            'direction' => 'asc'
        ]));

        $response->assertStatus(200);
        // Should fall back to default sorting and not crash
        $response->assertInertia(fn ($page) => 
            $page->has('students.data')
        );
    }
}