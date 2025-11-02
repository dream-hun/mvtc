<?php

namespace App\Models;

use Carbon\Carbon;
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

    /**
     * Scope to filter students by gender
     */
    public function scopeByGender($query, string $gender)
    {
        return $query->where('gender', $gender);
    }

    /**
     * Scope to get recent students
     */
    public function scopeRecent($query, int $limit = 5)
    {
        return $query->latest()->limit($limit);
    }

    /**
     * Scope to search students by name or email
     */
    public function scopeSearch($query, string $search)
    {
        return $query->where(function($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }
}
