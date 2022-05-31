<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCentrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('centros', function (Blueprint $table) {
            $table->bigInteger('codigo',false)->primary()->min(3)->max(6);
            $table->string('nombreCentro', 23);
            $table->string('provincia',50);
            $table->string('localidad',50);
            $table->string('calle',100);
            $table->smallInteger('cp');
            $table->string('cif',10)->unique();
            $table->string('telefono'); 
            $table->string('email',250);
            $table->string('nombreDirector',60);
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
        Schema::dropIfExists('centros');
    }
}
