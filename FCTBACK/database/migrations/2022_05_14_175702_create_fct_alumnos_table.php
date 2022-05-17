<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFctAlumnosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fct_alumnos', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('alumno_id');
            $table->foreign('alumno_id')->references('id')->on('alumnos')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedInteger('empresa_id');
            $table->foreign('empresa_id')->references('id')->on('empresas')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedInteger('responsable_id');
            $table->foreign('responsable_id')->references('id')->on('responsables')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tutor_id')->unsigned();
            $table->foreign('tutor_id')->references('id')->on('tutores')->onDelete('cascade');
            $table->bigInteger('codigoCentro');
            $table->foreign('codigoCentro')->references('codigo')->on('centros')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('fct_alumnos');
    }
}
