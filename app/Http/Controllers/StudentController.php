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

    public function index()
    {
        return Inertia::render('Students/Index', [
            'students' => Student::with('department')->paginate(10),
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
