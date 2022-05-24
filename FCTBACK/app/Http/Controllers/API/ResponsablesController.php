<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Responsables;
use Illuminate\Support\Facades\DB;

class ResponsablesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Responsables::all();
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
        $responsable = new Responsables();
        $responsable->nombreResponsable = $request->input('nombreResponsable');
        $responsable->dniResponsable = $request->input('dniResponsable');
        $responsable->email = $request->input('email');
        $responsable->empresa_id = $request->input('empresa_id');
        return $responsable->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Responsables::findOrFail($id);
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
        $responsable = Responsables::find($id);
        $responsable->nombreResponsable = $request->input('nombreResponsable');
        $responsable->dniResponsable = $request->input('dniResponsable');
        $responsable->email = $request->input('email');
        $responsable->empresa_id = $request->input('empresa_id');
        DB::update('UPDATE fct_alumnos SET empresa_id = ? WHERE responsable_id =?',[$responsable->empresa_id, $id]);
        
        $responsable->save();

        
    }

    /**
     * Remove the specified resource FROM storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Responsables::destroy($id);
    }
    public function findResponsablesByEmpresaID($id){
        return  DB::select('SELECT * FROM responsables WHERE empresa_id = ?', [$id]);
    } 

    public function alumosResponsable($id){
        return DB::select("SELECT fct_alumnos.alumno_id as id, 
                                (SELECT a.nombreAlumno
                                    FROM tutores as t inner join cursos c on c.tutor_id=t.id 
                                        inner JOIN alumnos a on a.curso_id= c.id
                                    WHERE a.id = fct_alumnos.alumno_id) as nombreAlumno,
                                (SELECT c.cicloFormativo 
                                    FROM tutores as t inner join cursos c on c.tutor_id=t.id 
                                        inner JOIN alumnos a on a.curso_id= c.id
                                        WHERE a.id = fct_alumnos.alumno_id) as cicloFormativo ,
                                (SELECT c.nHoras 
                                    FROM tutores as t inner join cursos c on c.tutor_id=t.id 
                                        inner JOIN alumnos a on a.curso_id= c.id
                                    WHERE a.id = fct_alumnos.alumno_id) as nHoras,
                                (SELECT count(tareas.alumno_id) 
                                    FROM tareas 
                                    WHERE tareas.alumno_id=fct_alumnos.alumno_id) as ntareas , 
                                (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(tiempo)))
                                    FROM tareas 
                                    WHERE alumno_id=fct_alumnos.alumno_id) as horasRealizadas
                            FROM fct_alumnos WHERE fct_alumnos.responsable_id=?;",[$id]);
    }

    public function validaTareaResponsable($id){
        return DB::update("update tareas set validadoResponsable=1 WHERE id=? ",[$id]);
    }

    public function getIdResposable(Request $request){
        return DB::select("select id from responsables where dniResponsable =?",[$request->dni])[0];
    }

  
}
