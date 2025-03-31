<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\categories;
class Product extends Model
{
    use HasFactory;

    protected $table = 'produits'; // Ensure this matches your database table name

    protected $fillable = [
       
    
        'image_src',
        'category_id',

        'name',
        'name_ar',
        'name_en',

        'description',
        'description_ar',
        'description_en',

        'emporter',
        'livrison',

        'ingredians',
        'ingredians_ar',
        'ingredians_en',

        'title',
        'title_ar',
        'title_en',
        
        
      
    ];

    public function categories()
    {
        return $this->belongsTo(categories::class, 'category_id');
    }
}
