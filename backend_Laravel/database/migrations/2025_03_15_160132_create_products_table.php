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
        Schema::create('produits', function (Blueprint $table) {

            $table->id();
            $table->string('image_src');
            //=======================
            $table->string('name');
            $table->string('name_ar');
            $table->string('name_en');
            //=======================
            $table->string('description');
            $table->string('description_ar');
            $table->string('description_en');
            //=======================
            $table->integer('emporter');
            $table->integer('livrison');
            //=======================
            $table->string('ingredians');
            $table->string('ingredians_ar');
            $table->string('ingredians_en');
            //=======================
            $table->string('title');
            $table->string('title_ar');
            $table->string('title_en');
            //=======================
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
