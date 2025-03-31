<?php

namespace App\Http\Controllers;

use App\Models\categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index()
    {
        return categories::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name_en' => 'required|string|max:255',
            'name_fr' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'description_en' => 'nullable|string',
            'description_fr' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'meta_title_en' => 'nullable|string',
            'meta_title_fr' => 'nullable|string',
            'meta_title_ar' => 'nullable|string',
        ]);

        $category = categories::create($request->all());
        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = categories::findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name_en' => 'sometimes|required|string|max:255',
            'name_fr' => 'sometimes|required|string|max:255',
            'name_ar' => 'sometimes|required|string|max:255',
            'description_en' => 'nullable|string',
            'description_fr' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'meta_title_en' => 'nullable|string',
            'meta_title_fr' => 'nullable|string',
            'meta_title_ar' => 'nullable|string',
        ]);

        $category = categories::findOrFail($id);
        $category->update($request->all());
        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = categories::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}