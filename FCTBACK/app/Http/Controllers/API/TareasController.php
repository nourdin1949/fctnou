<?php

namespace App\Http\Controllers\API;

use App\Models\tareas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

class TareasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  tareas::all();
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
        $tareas = new tareas();
        $tareas->alumno_id = $request->input('alumno_id');
        $tareas->descripcion  = $request->input('descripcion');
        $tareas->orientacion = $request->input('orientacion');
        $tareas->tiempo = $request->input('tiempo');
        $tareas->fecha = $request->input('fecha');
        $tareas->dificultad = $request->input('dificultad');
        $tareas->observaciones = $request->input('observaciones');
        $tareas->validadoResponsable  = $request->input('validadoResponsable');
        $tareas->validadoTutor  = $request->input('validadoTutor');
        return $tareas->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return  DB::select("select * from tareas where alumno_id = ?", [$id]);
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
        return DB::update("update tareas set descripcion=?, orientacion=?, tiempo=?,  dificultad=? where id=?", [
            $request->descripcion,
            $request->orientacion, 
            $request->tiempo, 
            $request->dificultad, 
            $id
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return tareas::destroy($id);
    }

    public function listarTareasEntreFechas(Request $request, $id)
    {
        return DB::select("select * from tareas where alumno_id =? and fecha between ? and ?", [
            $id, 
            $request->primeraFecha, 
            $request->segundaFecha
        ]);
    }
    public function listarTareasPorFecha($fecha)
    {
        return DB::select("select * from tareas where  fecha = ?", [$fecha]);
    }

    public function listarTareasPorID($id)
    {
        return DB::select("select * from tareas where  id = ?", [$id]);
    }

    public function fichasemanal($id){
        return DB::select("select al.nombreAlumno, em.nombreEmpresa, resp.nombreResponsable, 
            tutor.nombreTutor, centros.nombreCentro from fct_alumnos as fct inner join alumnos as al 
            on al.id= fct.alumno_id inner join cursos as c on c.id=al.curso_id inner join 
            empresas as em on em.id= fct.empresa_id inner join responsables as resp 
            on resp.id= fct.responsable_id inner join tutores as tutor on tutor.id = fct.tutor_id
            inner join centros on centros.codigo= tutor.codigoCentro  where al.id=? ", [$id])[0];
    }

    public function buscarTareas(Request $request){
        $fecha1 = $request->fecha1;
        $fecha2 = $request->fecha2;
        $id= $request->id;

        return DB::select("select * from tareas where alumno_id=? and fecha");
    }
 
}
