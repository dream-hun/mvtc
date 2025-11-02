<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DepartmentControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
    }

    public function test_index_displays_departments_with_pagination()
    {
        Department::factory()->count(15)->create();

        $response = $this->actingAs($this->user)->get(route('departments.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Departments/Index')
                ->has('departments.data', 10) // Default pagination
                ->where('departments.current_page', 1)
                ->where('departments.last_page', 2)
        );
    }

    public function test_index_sorts_departments_by_name_ascending()
    {
        $departmentB = Department::factory()->create(['name' => 'Computer Science']);
        $departmentA = Department::factory()->create(['name' => 'Biology']);

        $response = $this->actingAs($this->user)->get(route('departments.index', [
            'sort' => 'name',
            'direction' => 'asc'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('departments.data.0.name', 'Biology')
                ->where('departments.data.1.name', 'Computer Science')
        );
    }

    public function test_index_sorts_departments_by_status()
    {
        $activeDept = Department::factory()->create(['status' => 'active', 'name' => 'Active Dept']);
        $inactiveDept = Department::factory()->create(['status' => 'inactive', 'name' => 'Inactive Dept']);

        $response = $this->actingAs($this->user)->get(route('departments.index', [
            'sort' => 'status',
            'direction' => 'asc'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('departments.data.0.status', 'active')
                ->where('departments.data.1.status', 'inactive')
        );
    }

    public function test_index_searches_departments_by_name()
    {
        Department::factory()->create(['name' => 'Computer Science']);
        Department::factory()->create(['name' => 'Biology']);

        $response = $this->actingAs($this->user)->get(route('departments.index', [
            'search' => 'Computer'
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->has('departments.data', 1)
                ->where('departments.data.0.name', 'Computer Science')
        );
    }

    public function test_index_maintains_filters_in_response()
    {
        Department::factory()->create();

        $response = $this->actingAs($this->user)->get(route('departments.index', [
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
        Department::factory()->create();

        $response = $this->actingAs($this->user)->get(route('departments.index', [
            'sort' => 'name; DROP TABLE departments;',
            'direction' => 'asc'
        ]));

        $response->assertStatus(200);
        // Should fall back to default sorting and not crash
        $response->assertInertia(fn ($page) => 
            $page->has('departments.data')
        );
    }
}