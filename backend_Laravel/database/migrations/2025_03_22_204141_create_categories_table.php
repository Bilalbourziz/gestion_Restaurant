<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string("image_src");
            $table->string("name_fr");
            $table->string("name_en");
            $table->string("name_ar");
            $table->string("description_fr");
            $table->string("description_en");
            $table->string("description_ar");
            $table->string("meta_title_fr");
            $table->string("meta_title_en");
            $table->string("meta_title_ar");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
