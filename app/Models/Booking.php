<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use SoftDeletes;

    protected $table = 'bookings';
    protected $fillable = [
        'room_id',
        'user_id',
        'start_date',
        'end_date',
        'status',
    ];
    protected $casts = [
        'start_date' => 'datetime:Y-m-d H:i',
        'end_date' => 'datetime:Y-m-d H:i',
    ];

    protected $appends = [
        'user_full_name', 'room_name'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUserFullNameAttribute()
    {
        return $this->user ? $this->user->first_name. " " . $this->user->last_name : null;
    }

    public function getRoomNameAttribute()
    {
        return $this->room ? $this->room->name : null;
    }
}
