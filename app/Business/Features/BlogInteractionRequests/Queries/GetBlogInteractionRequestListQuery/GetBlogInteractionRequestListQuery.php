<?php
namespace App\Business\Features\BlogInteractionRequests\Queries\GetBlogInteractionRequestListQuery;

use App\Models\BlogInteractionRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class GetBlogInteractionRequestListQuery
{
    public function handle(GetBlogInteractionRequestListRequest $request): LengthAwarePaginator
    {
        $query = BlogInteractionRequest::query();

        if ($request->name !== null) {
            $query->where('name', 'like', "%{$request->name}%");
        }
        if ($request->email !== null) {
            $query->where('email', 'like', "%{$request->email}%");
        }
        if ($request->phone !== null) {
            $query->where('phone', 'like', "%{$request->phone}%");
        }
        if ($request->interaction_type !== null) {
            $query->where('interaction_type', 'like', "%{$request->interaction_type}%");
        }
        if ($request->title !== null) {
            $query->where('title', 'like', "%{$request->title}%");
        }
        if ($request->is_readed !== null) {
            $query->where('is_readed', $request->is_readed);
        }
        if ($request->is_handled !== null) {
            $query->where('is_handled', $request->is_handled);
        }
        if ($request->is_completed !== null) {
            $query->where('is_completed', $request->is_completed);
        }
        if ($request->kvkk_approved !== null) {
            $query->where('kvkk_approved', $request->kvkk_approved);
        }

        return $query->orderBy('created_at', 'desc')->paginate($request->perPage, ['*'], 'page', $request->page);
    }
}