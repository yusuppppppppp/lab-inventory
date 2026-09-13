<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'category',
        'quantity',
        'condition',
        'location',
        'received_at',
    ];

    protected $casts = [
        'received_at' => 'date',
        'quantity' => 'integer',
    ];
}
