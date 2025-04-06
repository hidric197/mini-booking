<?php

namespace App\Services;

use Nette\Utils\Random;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Repositories\UserRepository;
use App\Repositories\BookingRepository;

class BookingService
{
    protected $bookingRepository;
    protected $userRepository;
    
    public function __construct(
        BookingRepository $bookingRepository,
        UserRepository $userRepository
    ) {
        $this->bookingRepository = $bookingRepository;
        $this->userRepository = $userRepository;
    }
    
    public function getBookings($input = [], $paginate = false): mixed
    {
        $bookings = $this->bookingRepository->getList($input, $paginate);

        return $bookings;
    }

    public function getBooking($id)
    {
        $booking = $this->bookingRepository->getById($id);

        return $booking;
    }

    public function createBooking($input = [])
    {
        DB::beginTransaction();
        try {
            $user = $this->userRepository->getByColumn($input['email'], 'email');

            // Check if user exists, if not create a new temp user
            if (!$user) {
                $user = $this->userRepository->create([
                    'first_name' => $input['first_name'],
                    'last_name' => $input['last_name'],
                    'phone_number' => $input['phone_number'],
                    'email' => $input['email'],
                    'password' => bcrypt(Random::generate(10)),
                ]);
                // todo: send email to user with login details including password
            }

            $input['user_id'] = $user->id;

            $booking = $this->bookingRepository->create($input);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create booking: ' . $e->getMessage());
            
            return response()->json(['error' => 'Failed to create booking'], 500);
        }

        return $booking;
    }

    public function updateBooking($id, $input = [])
    {
        DB::beginTransaction();
        try {
            $user = $this->userRepository->getByColumn($input['email'], 'email');

            // Check if user exists, if not create a new temp user
            if (!$user) {
                $user = $this->userRepository->create([
                    'first_name' => $input['first_name'],
                    'last_name' => $input['last_name'],
                    'phone_number' => $input['phone_number'],
                    'email' => $input['email'],
                    'password' => bcrypt(Random::generate(10)),
                ]);
                // todo: send email to user with login details including password
            } else {
                $user->update([
                    'first_name' => $input['first_name'],
                    'last_name' => $input['last_name'],
                    'phone_number' => $input['phone_number'],
                ]);
            }

            $input['user_id'] = $user->id;
            
            $booking = $this->bookingRepository->updateById($id, $input);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update booking: ' . $e->getMessage());
            
            return ['error' => 'Failed to update booking'];
        }

        return $booking;
    }

    public function deleteBooking($id)
    {
        DB::beginTransaction();
        try {
            $booking = $this->bookingRepository->deleteById($id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete booking: ' . $e->getMessage());
            
            return ['error' => 'Failed to delete booking'];
        }

        return $booking;
    }

    public function checkRoomAvailability($id = null, $roomId, $startDate, $endDate)
    {
        $bookings = $this->bookingRepository->getBookingRoom($id, $roomId, $startDate, $endDate);

        if ($bookings->isEmpty()) {
            return false; // Room is not available
        }

        return true;
    }
}
