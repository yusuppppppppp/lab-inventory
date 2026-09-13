<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = Category::pluck('name')->toArray();
        if (empty($categories)) {
            $categories = ['Elektronik', 'Kimia', 'Fisika', 'Biologi'];
        }

        return [
            'code' => 'ITM-'.fake()->unique()->numerify('####').'-'.fake()->unique()->lexify('??'),
            'name' => fake()->words(2, true),
            'category' => fake()->randomElement($categories),
            'quantity' => fake()->numberBetween(0, 100),
            'condition' => fake()->randomElement(['good', 'minor_damage', 'major_damage']),
            'location' => 'Lab-'.fake()->randomLetter().'-'.fake()->numerify('##'),
            'received_at' => fake()->optional(0.8)->date(),
        ];
    }
}
