<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ingredients extends Model
{
    protected $table = 'ingredients';
    protected $fillable = ['name_en', 'name_fr', 'name_ar'];

}
