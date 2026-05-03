<?php

namespace App\Business\Features\Categories\Commands\DeleteCategoryCommand;

use App\Models\Category;
use Symfony\Component\HttpKernel\Exception\HttpException;

class DeleteCategoryCommand
{
    public function handle(int $id): array
    {
        $category = Category::findOrFail($id);

        // Check if it has blogs
        if ($category->blogs()->count() > 0) {
            throw new HttpException(400, "Cannot delete category with associated blogs.");
        }

        $category->delete();

        return [
            'message' => 'Category deleted successfully',
        ];
    }
}
