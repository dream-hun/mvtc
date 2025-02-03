<?php
namespace App\Observers;

use App\Models\Student;
use App\Models\User;
use App\Notifications\NewStudentNotification;

class StudentObserver
{
    public function created(Student $student)
    {
        User::chunk(2, function ($users) use ($student) {  // $users is a collection
            foreach ($users as $user) {  // Loop through each user
                $user->notify(new NewStudentNotification($student));
            }
        });
    }
}
