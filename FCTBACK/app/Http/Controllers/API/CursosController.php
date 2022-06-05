<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cursos;
use Illuminate\Support\Facades\DB;
class CursosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::select("SELECT * FROM cursos where activo =1");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $curso = new Cursos();
        $curso->codigoCiclo = $request->input('codigoCiclo');
        $curso->familiaProfesional = $request->input('familiaProfesional');
        $curso->cicloFormativo = $request->input('cicloFormativo');
        $curso->cursoAcademico = $request->input('cursoAcademico');
        $curso->nHoras = $request->input('nHoras');
        $curso->tutor_id = $request->input('tutor_id');
        return $curso->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Cursos::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $curso = Cursos::find($id);
        $curso->codigoCiclo = $request->input('codigoCiclo');
        $curso->familiaProfesional = $request->input('familiaProfesional');
        $curso->cicloFormativo = $request->input('cicloFormativo');
        $curso->cursoAcademico = $request->input('cursoAcademico');
        $curso->nHoras = $request->input('nHoras');
        $curso->tutor_id = $request->input('tutor_id');
        return $curso->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return DB::update("UPDATE cursos SET activo=0 where id=?",[$id]);
    }

    public function alumnosMatriculados($id){
        return DB::select("SELECT * FROM alumnos WHERE curso_id=? AND activo=1",[$id]);
    }
    public function nombreCurso($codigoCiclo){
        return DB::select("SELECT * FROM cursos WHERE codigoCiclo=?",[$codigoCiclo])[0];
    }
}
