<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alumnos;
use Illuminate\Support\Facades\DB;

class AlumnosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::select("SELECT * FROM alumnos where matriculado =1");
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
        $alumno = new Alumnos();
        $alumno->nombreAlumno = $request->input('nombreAlumno');
        $alumno->dniAlumno = $request->input('dniAlumno');
        $alumno->curso_id = $request->input('curso_id');
        $alumno->provincia = $request->input('provincia');
        $alumno->localidad = $request->input('localidad');
        $alumno->calle = $request->input('calle');
        $alumno->cp = $request->input('cp');
        $alumno->email = $request->input('email');
        $alumno->matriculado = $request->input('matriculado');
        return $alumno->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Alumnos::findOrFail($id);
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
        $alumno = Alumnos::find($id);
        $dniAlumno =$alumno->dniAlumno;
        $alumno->nombreAlumno = $request->input('nombreAlumno');
        $alumno->dniAlumno = $request->input('dniAlumno');
        $alumno->curso_id = $request->input('curso_id');
        $alumno->provincia = $request->input('provincia');
        $alumno->localidad = $request->input('localidad');
        $alumno->calle = $request->input('calle');
        $alumno->cp = $request->input('cp');
        $alumno->email = $request->input('email');
        $alumno->matriculado = $request->input('matriculado'); 
        $alumno->save();
        if ($dniAlumno!=$alumno->dniAlumno) {
            DB::update("UPDATE users set username=? where username=?",[$alumno->dniAlumno,$dniAlumno]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::update("UPDATE alumnos SET matriculado=0 where id=?", [$id]);
        $dni =  (DB::select("SELECT dniAlumno FROM alumnos where id =?", [$id])[0]->dniAlumno);
        DB::update("UPDATE users SET activo=0 where username=?", [$dni]);
    }

    public function getIdUser(Request $request)
    {
        return DB::select("select id from alumnos where dniAlumno =?", [$request->dni]);
    }
    public function getNombre($dni)
    {
        return DB::select("SELECT nombreAlumno from alumnos where dniAlumno=?", [$dni])[0];
    }
}
