<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombreEmpresa',50);
            $table->string('provincia',50);
            $table->string('localidad',50);
            $table->string('calle',100);
            $table->integer('cp');
            $table->string('cif',10)->unique();
            $table->string('telefono'); 
            $table->string('email',250);
            $table->string('dniRepresentante',9)->unique();
            $table->string('nombreRepresentante',30);
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
        Schema::dropIfExists('empresas');
    }
}
