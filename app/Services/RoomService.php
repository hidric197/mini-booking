<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Repositories\RoomRepository;
use App\Repositories\UserRepository;
use App\Repositories\BookingRepository;

class RoomService
{
    protected $roomRepository;

    public function __construct(
        RoomRepository $roomRepository
    ) {
        $this->roomRepository = $roomRepository;
    }

    public function getRooms($input = [], $paginate = false): mixed
    {
        $rooms = $this->roomRepository->getList($input, $paginate);

        return $rooms;
    }

    public function createRoom($input = [])
    {
        DB::beginTransaction();
        try {
            $room = $this->roomRepository->create($input);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create room: ' . $e->getMessage());

            return [];
        }

        return $room;
    }

    public function getRoom($id)
    {
        $room = $this->roomRepository->getById($id);

        return $room;
    }

    public function getRoomBookings($id)
    {
        $room = $this->roomRepository->getRoomBookings($id);

        return $room;
    }

    public function deleteRoom($id)
    {
        DB::beginTransaction();
        try {
            $room = $this->roomRepository->deleteById($id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete room: ' . $e->getMessage());

            return [];
        }

        return $room;
    }

    public function updateRoom($id, $input = [])
    {
        DB::beginTransaction();
        try {
            $room = $this->roomRepository->updateById($id, $input);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Failed to update room: ' . $e->getMessage());

            return [];
        }

        return $room;
    }
}
