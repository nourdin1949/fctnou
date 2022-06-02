<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Tutores;

class TutoresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::select("SELECT * FROM tutores where activo =1");
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
        $tutores = new Tutores();

        $tutores->codigoCentro = $request->input('codigoCentro');
        $tutores->nombreTutor = $request->input('nombreTutor');
        $tutores->dniTutor = $request->input('dniTutor');
        $tutores->email = $request->input('email');

        return $tutores->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Tutores::findOrFail($id);
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
        $tutores = Tutores::find($id);
        $dniTutor = $tutores->dniTuor;
        $tutores->codigoCentro = $request->input('codigoCentro');
        $tutores->nombreTutor = $request->input('nombreTutor');
        $tutores->dniTutor = $request->input('dniTutor');
        $tutores->email = $request->input('email');
        $tutores->save();
        DB::update('UPDATE fct_alumnos SET codigoCentro = ? WHERE tutor_id =?',[$tutores->codigoCentro, $id]);
        DB::update("UPDATE users set username=? where username=?",[$tutores->dniTutor,$dniTutor]);
    }

    /**
     * Remove the specified resource FROM storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::update("UPDATE tutores SET activo=0 where id=?",[$id]);
        $dni =  (DB::select("SELECT dniTutor FROM tutores where id =?",[$id])[0]->dniTutor);
        DB::update("UPDATE users SET activo=0 where username=?",[$dni]);
    }

    public function getIdUser(Request $request)
    {
        return DB::select("SELECT id FROM tutores WHERE dniTutor=?", [$request->dni])[0];
    }

    public function alumnoTutor($id){
        return DB::select("SELECT fct_alumnos.alumno_id as id, 
                                (SELECT a.nombreAlumno
                                    FROM tutores as t INNER JOIN cursos c on c.tutor_id=t.id 
                                        INNER JOIN alumnos a on a.curso_id= c.id
                                    WHERE a.id = fct_alumnos.alumno_id) as nombreAlumno,
                                (SELECT c.cicloFormativo 
                                    FROM tutores as t INNER JOIN cursos c on c.tutor_id=t.id 
                                        INNER JOIN alumnos a on a.curso_id= c.id
                                        WHERE a.id = fct_alumnos.alumno_id) as cicloFormativo ,
                                (SELECT c.nHoras 
                                    FROM tutores as t INNER JOIN cursos c on c.tutor_id=t.id 
                                        INNER JOIN alumnos a on a.curso_id= c.id
                                    WHERE a.id = fct_alumnos.alumno_id) as nHoras,
                                (SELECT count(tareas.alumno_id) 
                                    FROM tareas 
                                    WHERE tareas.alumno_id=fct_alumnos.alumno_id) as ntareas , 
                                (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(tiempo)))
                                    FROM tareas 
                                    WHERE alumno_id=fct_alumnos.alumno_id) as horasRealizadas
                            FROM fct_alumnos WHERE fct_alumnos.tutor_id=?", [$id]);
    }

    public function validaTareaTutor($id)
    {

        return DB::update("UPDATE tareas SET validadoTutor=1 WHERE id=? ", [$id]);
    }
    public static  function listarTutores()
    {

        return DB::select("select * from tutores ");
    }

    public function getNombre($dni)
    {
        return DB::select("SELECT nombreTutor from tutores where dniTutor=?", [$dni])[0];
    }
}
