<?php

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BookingController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth.jwt'])->group(function () {
    Route::group(['prefix' => 'rooms', 'as' => 'rooms.'], function () {
        Route::get('/', [RoomController::class, 'index'])->withoutMiddleware(['auth.jwt']);
        Route::get('/{id}', [RoomController::class, 'show'])->withoutMiddleware(['auth.jwt']);
        Route::get('/{id}/bookings', [RoomController::class, 'roomBookings'])->withoutMiddleware(['auth.jwt']);
        Route::post('/', [RoomController::class, 'store']);
        Route::put('/{id}', [RoomController::class, 'update']);
        Route::delete('/{id}', [RoomController::class, 'destroy']);
    });
    
    Route::group(['prefix' => 'bookings', 'as' => 'bookings.'], function () {
        Route::get('/', [BookingController::class, 'index'])->withoutMiddleware(['auth.jwt']);
        Route::get('/{id}', [BookingController::class, 'show'])->withoutMiddleware(['auth.jwt']);
        Route::post('/', [BookingController::class, 'store'])->withoutMiddleware(['auth.jwt']);
        Route::put('/{id}', [BookingController::class, 'update']);
        Route::delete('/{id}', [BookingController::class, 'destroy']);
    });

    Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/me', [UserController::class, 'me']);
    });
    
});
