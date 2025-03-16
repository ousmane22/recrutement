<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class RepositoryBase implements IRepositoryBase
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

      public function all()
    {
        return $this->model->orderBy('id', 'desc')
           ->get();
    }

    public function find(int $id)
    {
        return $this->model->where('id', $id)->first();
    }
    
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        try {
            $record = $this->find($id);
            if (!$record) {
                throw new \Exception('Record not found');
            }

            $record->update($data);
            return $record;
        } catch (\Exception $e) {
            \Log::error('Update failed: ' . $e->getMessage());
            return null;
        }
    }

    public function delete(int $id)
    {
        $record = $this->find($id);

        if (!$record) {
            return null;
        }

        return $record->delete();
    }
}
