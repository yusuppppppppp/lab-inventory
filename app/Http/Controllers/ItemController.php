<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('inventory/index', [
            'items' => Item::latest()->paginate(5)->withQueryString(),
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('inventory/create', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:items,code',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'condition' => 'required|in:good,minor_damage,major_damage',
            'location' => 'required|string|max:255',
            'received_at' => 'nullable|date',
        ]);

        Item::create($validated);

        return to_route('items.index');
    }

    public function edit(Item $item): Response
    {
        return Inertia::render('inventory/edit', [
            'item' => $item,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Item $item): RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:items,code,'.$item->id,
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'condition' => 'required|in:good,minor_damage,major_damage',
            'location' => 'required|string|max:255',
            'received_at' => 'nullable|date',
        ]);

        $item->update($validated);

        return to_route('items.index');
    }

    public function destroy(Item $item): RedirectResponse
    {
        $item->delete();

        return to_route('items.index');
    }
}
