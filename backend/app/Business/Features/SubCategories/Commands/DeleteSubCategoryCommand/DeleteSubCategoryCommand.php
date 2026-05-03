<?php

namespace App\Business\Features\SubCategories\Commands\DeleteSubCategoryCommand;

use App\Models\SubCategory;
use Symfony\Component\HttpKernel\Exception\HttpException;

class DeleteSubCategoryCommand
{
    public function handle(int $id): array
    {
        $subCategory = SubCategory::findOrFail($id);

        // Check if has blogs
        if ($subCategory->blogs()->count() > 0) {
            throw new HttpException(400, "Cannot delete sub-category with associated blogs.");
        }

        $subCategory->delete();

        return [
            'message' => 'SubCategory deleted successfully',
        ];
    }
}
