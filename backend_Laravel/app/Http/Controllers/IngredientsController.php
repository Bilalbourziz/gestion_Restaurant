<?php

namespace App\Http\Controllers;

use App\Models\ingredients;
use Illuminate\Http\Request;

class IngredientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ingredients = ingredients::all();
        return response()->json($ingredients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_en' => 'required|string|max:255',
            'name_fr' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
        ]);

        $ingredient = ingredients::create($request->all());
        return response()->json($ingredient, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $ingredient = ingredients::findOrFail($id);
        return response()->json($ingredient);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name_en' => 'sometimes|required|string|max:255',
            'name_fr' => 'sometimes|required|string|max:255',
            'name_ar' => 'sometimes|required|string|max:255',
        ]);

        $ingredient = ingredients::findOrFail($id);
        $ingredient->update($request->all());
        return response()->json($ingredient);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ingredient = ingredients::findOrFail($id);
        $ingredient->delete();
        return response()->json(null, 204);
    }
}