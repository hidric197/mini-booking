<?php

namespace App\Repositories;

use App\Models\Booking;
use JasonGuru\LaravelMakeRepository\Repository\BaseRepository;

/**
 * Class BookingRepository.
 */
class BookingRepository extends BaseRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        return Booking::class;
    }

    public function getList($input = [], $pagination = false): mixed
    {
        $query = $this->model->query();

        if (!empty($input['room_id'])) {
            $query->where('room_id', $input['room_id']);
        }

        if (!empty($input['user_id'])) {
            $query->where('user_id', $input['user_id']);
        }

        if (!empty($input['start_date'])) {
            $query->where('start_date', '>=', $input['start_date']);
        }

        if (!empty($input['end_date'])) {
            $query->where('end_date', '<=', $input['end_date']);
        }

        if ($pagination) {
            $page = !empty($input['page']) ? $input['page'] : 0;
            $perPage = !empty($input['per_page']) ? $input['per_page'] : 10;
            $offset = ($page - 1) * $perPage;
            $columns = !empty($input['columns']) ? $input['columns'] : ["*"];

            if (!empty($input["sort"])) {
                foreach (explode(",", $input["sort"]) as $column => $directory) {
                    $query->orderBy($column, $directory);
                }
            } else {
            	$query->orderByDesc('start_date');
            }
            return $query->paginate($perPage, $columns, 'page', $page, $offset);
        }

        return $query->get();
    }

    public function getBookingRoom($id = null, $roomId, $startDate, $endDate)
    {
        $query = $this->model->query();
        if ($id) {
            $query->where('id', '!=', $id);
        }
        
        $query->where('room_id', $roomId)
            ->where('status', '!=', 'cancelled')
            ->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween('start_date', [$startDate, $endDate])
                    ->orWhereBetween('end_date', [$startDate, $endDate]);
            });
        return $query->get();
    }
}
