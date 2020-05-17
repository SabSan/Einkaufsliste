<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListentriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listentries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('description');
            $table->string('amount');
            $table->float('max_price');
            $table->bigInteger('shoppinglist_id')->unsigned();
            $table->foreign('shoppinglist_id')->references('id')->on('shoppinglists')->onDelete('cascade');
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
        Schema::dropIfExists('listentries');
    }
}
