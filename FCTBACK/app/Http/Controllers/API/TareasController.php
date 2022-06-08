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
        return  DB::select("select * FROM tareas where alumno_id = ?", [$id]);
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
     * Remove the specified resource FROM storage.
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
        return DB::select("SELECT * FROM tareas 
                            WHERE alumno_id =? and (fecha between ? and ?) ", 
                            [
                                $id, 
                                $request->primeraFecha, 
                                $request->segundaFecha
                            ]);
    }
    public function listarTareasEntreFechasAlumno(Request $request, $id)
    {
        return DB::select("SELECT * FROM tareas 
                            WHERE alumno_id =? and (fecha between ? and ?) and validadoTutor =1", 
                            [
                                $id, 
                                $request->primeraFecha, 
                                $request->segundaFecha
                            ]);
    }
    public function listarTareasPorFecha($fecha)
    {
        return DB::select("SELECT * FROM tareas 
                            WHERE  fecha = ?", [$fecha]);
    }

    public function listarTareasPorID($id)
    {
        return DB::select("SELECT * FROM tareas 
                            WHERE  id = ? and (validadoTutor!=1)", [$id]);
    }

    public function fichasemanal($id){
        return DB::select("SELECT al.nombreAlumno, em.nombreEmpresa, resp.nombreResponsable, 
                        tutor.nombreTutor, centros.nombreCentro 
                            FROM fct_alumnos as fct INNER JOIN alumnos as al On al.id= fct.alumno_id 
                                INNER JOIN cursos as c on c.id=al.curso_id 
                                INNER JOIN empresas as em on em.id= fct.empresa_id 
                                INNER JOIN responsables as resp on resp.id= fct.responsable_id 
                                INNER JOIN tutores as tutor on tutor.id = fct.tutor_id
                                INNER JOIN centros on centros.codigo= tutor.codigoCentro  
                            WHERE al.id=? ", [$id])[0];
    }

}
