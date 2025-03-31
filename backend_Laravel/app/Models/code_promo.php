<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class code_promo extends Model
{
    protected $table = 'code_promos';
    protected $fillable = ['date_expire', 'code_promo'];
}
