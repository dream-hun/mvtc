<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'gender',
        'department_id',
    ];

    protected $casts = [
        'gender' => 'string',
        'status' => 'string',
    ];

    protected $appends = ['registered_at'];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    // Function to format date
    public function getRegisteredAtAttribute()
    {
        return Carbon::parse($this->created_at)->format('M d, Y');
    }
}
