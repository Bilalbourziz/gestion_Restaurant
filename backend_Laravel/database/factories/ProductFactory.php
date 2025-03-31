<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ["Hot Dishes", "Cold Dishes", "Soup", "Oat", "Appetizer", "Dessert"];
        $type = $this->faker->randomElement($types);

        return [
            'type' => $type,
            'image_src' => $this->faker->imageUrl(640, 480, 'food', true),
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'emporter' => $this->faker->numberBetween(10, 100),
            'livrison' => $this->faker->numberBetween(10, 100),
            'ingredians' => $this->faker->words(3, true), // 3 random words as ingredients
            'title' => $this->faker->sentence,
        ];
    }
}
