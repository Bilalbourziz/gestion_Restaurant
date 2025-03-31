<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductsController extends Controller
{
    public function typeProduit($category_id)
    {
        $produit = Product::where('category_id', $category_id)->get();
        return ProductResource::collection($produit);
    }

    public function index()
    {
        $produit = Product::all();
        return ProductResource::collection($produit);
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while deleting the product'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'category_id' => 'required|exists:categories,id',
                'name' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'name_ar' => 'nullable|string|max:255',
                'description_ar' => 'nullable|string',
                'name_en' => 'nullable|string|max:255',
                'description_en' => 'nullable|string',
                'emporter' => 'required|integer',
                'livrison' => 'required|integer',
                'ingredians' => 'nullable|string',
                'ingredians_ar' => 'nullable|string',
                'ingredians_en' => 'nullable|string',
                'title' => 'nullable|string|max:255',
                'title_ar' => 'nullable|string|max:255',
                'title_en' => 'nullable|string|max:255',
                'language' => 'required|in:fr,en,ar',
                'image' => 'nullable|image|max:2048',
            ]);
    
            $productData = [
                'category_id' => $validated['category_id'],
                'user_id' => $request->user()->id,
                'emporter' => $validated['emporter'],
                'livrison' => $validated['livrison'],
            ];
    
            switch ($validated['language']) {
                case 'fr':
                    $productData['name'] = $request->input('name', '');
                    $productData['description'] = $request->input('description', '');
                    $productData['title'] = $request->input('title', '');
                    $productData['ingredians'] = $request->input('ingredians', '');
                    break;
                case 'en':
                    $productData['name_en'] = $request->input('name_en', '');
                    $productData['description_en'] = $request->input('description_en', '');
                    $productData['title_en'] = $request->input('title_en', '');
                    $productData['ingredians_en'] = $request->input('ingredians_en', '');
                    break;
                case 'ar':
                    $productData['name_ar'] = $request->input('name_ar', '');
                    $productData['description_ar'] = $request->input('description_ar', '');
                    $productData['title_ar'] = $request->input('title_ar', '');
                    $productData['ingredians_ar'] = $request->input('ingredians_ar', '');
                    break;
            }
    
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('images', 'public');
                $productData['image_src'] = Storage::url($path);
            }
    
            $product = Product::create($productData);
    
            return response()->json($product, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation Error: ' . json_encode($e->errors()));
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error adding product: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}