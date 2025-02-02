<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function create()
    {
        $departments = Department::where('status', 'active')->get();

        return Inertia::render('Students/Register', ['departments' => $departments]);
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
}
