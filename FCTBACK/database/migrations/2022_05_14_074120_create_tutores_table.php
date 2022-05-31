<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTutoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutores', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string("nombreTutor", 50);
            $table->string('dniTutor', 9)->unique();
            $table->string('email', 250)->unique();
            $table->bigInteger('codigoCentro');
            $table->foreign('codigoCentro')->references('codigo')->on('centros')->onDelete('cascade');
            $table->boolean('activo')->default(1);
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
        Schema::dropIfExists('tutores');
    }
}
