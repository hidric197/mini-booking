<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Bookings\UpdateRequest;
use Illuminate\Http\Request;
use App\Services\BookingService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Bookings\CreateRequest;
use Carbon\Carbon;

class BookingController extends Controller
{
    protected $bookingService;
    public function __construct(
        BookingService $bookingService
    )
    {
        $this->bookingService = $bookingService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bookings = $this->bookingService->getBookings($request->all(), true);

        if (empty($bookings)) {
            return $this->errorResponse('No bookings found', 404);
        }

        return $this->successResponse($bookings, 'Bookings retrieved successfully');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRequest $request)
    {
        $startDate = Carbon::parse($request->start_date)->format('Y-m-d H:i:s');
        $endDate = Carbon::parse($request->end_date)->format('Y-m-d H:i:s');

        if ($this->bookingService->checkRoomAvailability(null, $request->room_id, $startDate, $endDate)) {
            return $this->errorResponse('Room is not available for the selected dates', 400);
        }

        $booking = $this->bookingService->createBooking($request->all());

        if (empty($booking)) {
            return $this->errorResponse('Create a booking has failure', 500);
        }

        return $this->successResponse($booking, 'Create a booking successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $booking = $this->bookingService->getBooking($id);

        if (empty($booking)) {
            return $this->errorResponse('Booking not found', 404);
        }

        return $this->successResponse($booking);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $booking = $this->bookingService->getBooking($id);

        if (empty($booking)) {
            return $this->errorResponse('Booking not found', 404);
        }

        $startDate = Carbon::parse($request->start_date)->format('Y-m-d H:i:s');
        $endDate = Carbon::parse($request->end_date)->format('Y-m-d H:i:s');
        if ($this->bookingService->checkRoomAvailability($id, $request->room_id, $startDate, $endDate)) {
            return $this->errorResponse('Room is not available for the selected dates', 400);
        }

        $updatedBooking = $this->bookingService->updateBooking($id, $request->all());

        if (isset($updatedBooking['error'])) {
            return $this->errorResponse('Update a booking has failure', 500);
        }

        return $this->successResponse($updatedBooking, 'Update a booking successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = $this->bookingService->getBooking($id);

        if (!$booking->exists()) {
            return $this->errorResponse('Booking not found', 404);
        }

        $deletedBooking = $this->bookingService->deleteBooking($id);

        if (isset($deletedBooking['error'])) {
            return $this->errorResponse('Delete a booking has failure', 500);
        }

        return $this->successResponse($deletedBooking, 'Delete a booking successfully');
    }
}
