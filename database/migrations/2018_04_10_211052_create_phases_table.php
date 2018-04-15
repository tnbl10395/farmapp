<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phases', function (Blueprint $table) {
            $table->increments('id')->indeX();
            $table->integer('plantId')->unsigned()->index();
            $table->foreign('plantId')->references('id')->on('plants');
            $table->string('name');
            $table->integer('days')->unsigned();
            $table->integer('minTemperature');
            $table->integer('maxTemperature');
            $table->integer('minHumidity');
            $table->integer('maxHumidity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phases');
    }
}
