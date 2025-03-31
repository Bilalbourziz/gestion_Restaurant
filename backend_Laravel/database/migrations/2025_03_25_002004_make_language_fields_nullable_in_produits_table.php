<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeLanguageFieldsNullableInProduitsTable extends Migration
{

    public function up()
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->string('name')->nullable()->change();
            $table->string('name_ar')->nullable()->change();
            $table->string('name_en')->nullable()->change();
            $table->text('description')->nullable()->change();
            $table->text('description_ar')->nullable()->change();
            $table->text('description_en')->nullable()->change();
            $table->string('title')->nullable()->change();
            $table->string('title_ar')->nullable()->change();
            $table->string('title_en')->nullable()->change();
            $table->string('ingredians')->nullable()->change();
            $table->string('ingredians_ar')->nullable()->change();
            $table->string('ingredians_en')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->string('name')->nullable(false)->change();
            $table->string('name_ar')->nullable(false)->change();
            $table->string('name_en')->nullable(false)->change();
            $table->text('description')->nullable(false)->change();
            $table->text('description_ar')->nullable(false)->change();
            $table->text('description_en')->nullable(false)->change();
            $table->string('title')->nullable(false)->change();
            $table->string('title_ar')->nullable(false)->change();
            $table->string('title_en')->nullable(false)->change();
            $table->string('ingredians')->nullable(false)->change();
            $table->string('ingredians_ar')->nullable(false)->change();
            $table->string('ingredians_en')->nullable(false)->change();
        });
    }
}