<?php

namespace App\Observers;

use App\Models\Student;
use App\Models\User;
use App\Notifications\NewStudentNotification;

class StudentObserver
{
    public function created(Student $student)
    {
        User::chunk(2,function ($user) use ($student){
            $user->notify(new NewStudentNotification($student));
        });
    }
}
