<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function create()
    {
        $departments = Department::where('status', 'active')->get();

        return Inertia::render('Students/Register', [
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'gender' => 'required|in:male,female,other',
            'department_id' => 'required|exists:departments,id',
        ]);

        Student::create($validated);

        return redirect()->back()
            ->with('success', 'Your application has been submitted successfully! We will contact you soon.');
    }

    public function index(Request $request)
    {
        $query = Student::with('department');
        
        // Apply search filter
        if ($request->filled('search')) {
            $query->search($request->get('search'));
        }
        
        // Apply sorting
        $sortField = $request->get('sort', 'created_at');
        $sortDirection = $request->get('direction', 'desc');
        
        // Validate sort field to prevent SQL injection
        $allowedSortFields = ['name', 'email', 'created_at', 'gender'];
        if (in_array($sortField, $allowedSortFields)) {
            if ($sortField === 'department') {
                // Sort by department name
                $query->join('departments', 'students.department_id', '=', 'departments.id')
                      ->orderBy('departments.name', $sortDirection)
                      ->select('students.*');
            } else {
                $query->orderBy($sortField, $sortDirection);
            }
        } else {
            // Default sorting
            $query->latest();
        }
        
        return Inertia::render('Students/Index', [
            'students' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    public function show(Student $student)
    {
        return Inertia::render('Students/Show', [
            'student' => $student->load('department'),
        ]);
    }

    public function edit(Student $student)
    {
        return Inertia::render('Students/Edit', [
            'student' => $student->load('department'),
            'departments' => Department::where('status', 'active')->get(),
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,'.$student->id,
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'gender' => 'required|in:male,female,other',
            'department_id' => 'required|exists:departments,id',
        ]);

        $student->update($validated);

        return redirect()->route('students.index')
            ->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Student deleted successfully.');
    }
}
