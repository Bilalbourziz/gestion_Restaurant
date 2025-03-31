<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\categories;

class productSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = categories::all();

        foreach ($categories as $category) {
            Product::factory()->count(10)->create([
                'category_id' => $category->id,
            ]);
        }
    }
}