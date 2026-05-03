<?php

namespace App\Business\Features\Educations\Commands\UpdateEducationOrderCommand;

use App\Models\Education;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UpdateEducationOrderCommand
{
    public function handle(UpdateEducationOrderCommandRequest $request): array
    {
        DB::transaction(function () use ($request) {
            // Get all items count for current domain. 
            // Assuming global scope applies.
            $total = Education::count();
            $orders = collect($request->orders);
            
            if ($orders->count() !== $total) {
                throw new HttpException(400, "Missing or extra items in the order list. Expected {$total} items.");
            }

            $uniqueOrders = $orders->pluck('order')->unique();
            if ($uniqueOrders->count() !== $total) {
                throw new HttpException(400, "Order values must be unique.");
            }

            $minOrder = $orders->min('order');
            $maxOrder = $orders->max('order');
            if ($minOrder !== 1 || $maxOrder !== $total) {
                throw new HttpException(400, "Order values must be a continuous sequence from 1 to {$total}.");
            }

            // Update orders using lock
            foreach ($orders as $item) {
                $modelItem = Education::lockForUpdate()->find($item['id']);
                if ($modelItem) {
                    $modelItem->order = $item['order'];
                    $modelItem->save();
                }
            }
        });

        return [
            'message' => 'Orders updated successfully'
        ];
    }
}