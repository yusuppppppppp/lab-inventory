<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Auth::check() ? redirect()->route('dashboard') : redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'stats' => [
                'totalItems' => Item::count(),
                'totalCategories' => Category::count(),
                'totalQuantity' => Item::sum('quantity'),
                'lowStock' => Item::where('quantity', '<', 5)->count(),
                'condition' => [
                    'good' => Item::where('condition', 'good')->count(),
                    'minor_damage' => Item::where('condition', 'minor_damage')->count(),
                    'major_damage' => Item::where('condition', 'major_damage')->count(),
                ],
            ],
            'recentItems' => Item::latest()->take(5)->get(),
            'lowStockItems' => Item::where('quantity', '<', 5)->latest()->take(5)->get(),
            'categoryDistribution' => Item::select('category', DB::raw('count(*) as total'))
                ->groupBy('category')
                ->orderByDesc('total')
                ->get(),
        ]);
    })->name('dashboard');
    Route::resource('items', ItemController::class)->except(['show']);
    Route::resource('categories', CategoryController::class)->except(['show']);
});

require __DIR__.'/settings.php';
