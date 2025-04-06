<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\RoomService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Rooms\CreateRequest;
use App\Http\Requests\Rooms\UpdateRequest;

class RoomController extends Controller
{
    protected $roomService;

    public function __construct(
        RoomService $roomService
    )
    {
        $this->roomService = $roomService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rooms = $this->roomService->getRooms($request->all(), true);

        if ($rooms->isEmpty()) {
            return $this->successResponse();
        }

        return $this->successResponse($rooms, 'Rooms retrieved successfully');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRequest $request)
    {
        $room = $this->roomService->createRoom($request->all());
        
        if (empty($room)) {
            return $this->errorResponse('Create a room has failure', 500);
        }

        return $this->successResponse($room, 'Create a room successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $room = $this->roomService->getRoom($id);

        if (empty($room)) {
            return $this->errorResponse('Room not found', 404);
        }

        return $this->successResponse($room);
    }

    public function roomBookings($id)
    {
        $room = $this->roomService->getRoom($id);

        if (empty($room)) {
            return $this->errorResponse('Room not found', 404);
        }

        $bookings = $this->roomService->getRoomBookings($id);

        if (empty($bookings)) {
            return $this->errorResponse('No bookings found for this room', 404);
        }

        return $this->successResponse($bookings, 'Bookings retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $room = $this->roomService->getRoom($id);

        if (empty($room)) {
            return $this->errorResponse('Room not found', 404);
        }

        $updatedRoom = $this->roomService->updateRoom($id, $request->all());

        if (empty($updatedRoom)) {
            return $this->errorResponse('Update a room has failure', 500);
        }

        return $this->successResponse($updatedRoom, 'Update a room successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = $this->roomService->getRoom($id);

        if (empty($room)) {
            return $this->errorResponse('Room not found', 404);
        }

        $deletedRoom = $this->roomService->deleteRoom($id);

        if (empty($deletedRoom)) {
            return $this->errorResponse('Delete a room has failure', 500);
        }

        return $this->successResponse($deletedRoom, 'Delete a room successfully');
    }
}
