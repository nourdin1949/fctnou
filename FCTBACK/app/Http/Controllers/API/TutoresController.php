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
        return Tutores::all();
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
        $tutores->codigoCentro = $request->input('codigoCentro');
        $tutores->nombreTutor = $request->input('nombreTutor');
        $tutores->dniTutor = $request->input('dniTutor');
        $tutores->email = $request->input('email');
        return $tutores->save();
    }

    /**
     * Remove the specified resource FROM storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       return Tutores::destroy($id);
    }

    public function getIdUser(Request $request){
        return DB::select("SELECT id FROM tutores WHERE dniTutor=?",[$request->dni])[0];
        
    }
    
    public function alumnoTutor($id){
        return DB::select("SELECT a.nombreAlumno, c.cicloFormativo,a.id, c.nHoras , 
                            (SELECT count(alumno_id) 
                                FROM tareas 
                                WHERE alumno_id=a.id) as ntareas , 
                            (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(tiempo))) as total 
                                FROM tareas 
                                WHERE tareas.alumno_id=a.id) as horasRealizadas
                            FROM tutores as t inner join cursos c on c.tutor_id=t.id 
                                inner JOIN alumnos a on a.curso_id= c.id
                            WHERE t.id=?;",[$id]);
    }
    
    public function validaTareaTutor($id){
        
        return DB::update("UPDATE tareas SET validadoTutor=1 WHERE id=? ",[$id]);
    }
    public static  function listarTutores(){
        
        return DB::select("select * from tutores ");
    }

    
}


