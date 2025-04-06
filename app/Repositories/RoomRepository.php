<?php

namespace App\Repositories;

use App\Models\Room;
use JasonGuru\LaravelMakeRepository\Repository\BaseRepository;

/**
 * Class RoomRepository.
 */
class RoomRepository extends BaseRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        return Room::class;
    }

    public function getList($input = [], $pagination = false): mixed
    {
        $query = $this->model->query();

        if (!empty($input['name'])) {
            $query->where('name', 'like', '%' . $input['name'] . '%');
        }

        if (!empty($input['price'])) {
            $query->where('price', '<=', $input['price']);
        }

        if (!empty($input['capacity'])) {
            $query->where('capacity', '>=', $input['capacity']);
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
            	$query->orderByDesc('created_at');
            }
            return $query->paginate($perPage, $columns, 'page', $page, $offset);
        }

        return $query->get();
    }

    public function getRoomBookings($id)
    {
        return $this->model->with('bookings')->find($id);
    }
}
