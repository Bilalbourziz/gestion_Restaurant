<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class categories extends Model
{
    protected $table = 'categories';
    protected $fillable = ['name_fr',
                           'name_en',
                           'name_ar',
                           'description_fr',
                           'description_en',
                           'description_ar',
                           'meta_title_fr',
                           'meta_title_en',
                           'meta_title_ar'
                        ];
public function produits()
{
return $this->hasMany(Product::class, 'category_id');
}

}
