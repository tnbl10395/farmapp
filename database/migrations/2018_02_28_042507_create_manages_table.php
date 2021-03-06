<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateManagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('manages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('userId')->unsigned()->index();
            $table->foreign('userId')->references('id')->on('users')->onDelete('restrict');
            $table->integer('deviceId')->unsigned()->index();
            $table->foreign('deviceId')->references('id')->on('devices')->onDelete('restrict');
            $table->integer('plantId')->unsigned()->nullable()->index();
            // $table->foreign('plantId')->reference('id')->on('plants')->onDelete('restrict');
            $table->date('startDate');
            $table->date('endDate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('manages');
    }
}
