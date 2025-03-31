<?php

namespace App\Http\Controllers;

use App\Models\code_promo;
use Illuminate\Http\Request;

class CodePromoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $codePromos = code_promo::all();
        return response()->json($codePromos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date_expire' => 'required|date|after:today',
            'code_promo' => 'required|string|max:255',
        ]);

        $codePromo = code_promo::create($request->all());
        return response()->json($codePromo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $codePromo = code_promo::findOrFail($id);
        return response()->json($codePromo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'date_expire' => 'sometimes|required|date|after:today',
            'code_promo' => 'sometimes|required|string|max:255',
        ]);

        $codePromo = code_promo::findOrFail($id);
        $codePromo->update($request->all());
        return response()->json($codePromo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $codePromo = code_promo::findOrFail($id);
        $codePromo->delete();
        return response()->json(['message' => 'Code promo deleted successfully']);
    }
}