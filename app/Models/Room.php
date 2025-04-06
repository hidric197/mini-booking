<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use SoftDeletes;
    protected $table = 'rooms';
    protected $fillable = [
        'name',
        'price',
        'description',
        'capacity'
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
