<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\FctAlumnos;
class FctAlumnosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FctAlumnos::all();
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
        $fctalumno = new FctAlumnos();
        $fctalumno->alumno_id = $request->input('alumno_id');
        $fctalumno->responsable_id  = $request->input('responsable_id');
        $fctalumno->empresa_id = $request->input('empresa_id');
        $fctalumno->tutor_id = $request->input('tutor_id');
        $fctalumno->codigoCentro = $request->input('codigoCentro');
        return $fctalumno->save();
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
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
        $alumnofct = FctAlumnos::find($id);
        $alumnofct->responsable_id = $request->input('responsable_id');
        $alumnofct->empresa_id = $request->input('empresa_id');
        return $alumnofct->save();    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return FctAlumnos::destroy($id);
    }
    public function listarfct(){
        return DB::select("select fct.tutor_id as tutor_id, fct.id, al.nombreAlumno, al.id as alumno_id, em.nombreEmpresa, em.id as empresa_id,
        resp.nombreResponsable,resp.id as responsable_id ,tutor.nombreTutor, c.codigoCiclo from fct_alumnos as fct inner join alumnos as al on al.id= fct.alumno_id 
        inner join cursos as c on c.id=al.curso_id inner join empresas as em on em.id= fct.empresa_id 
        inner join responsables as resp on resp.id= fct.responsable_id 
        inner join 
            tutores as tutor  on  tutor.id = fct.tutor_id;");
    }


    public function listarfctEmpCen($empresa,$centro)
    {  $codigo = DB::select("select codigoCentro from tutores where id=?", [$centro])[0];
        return DB::select("select al.*, c.* from fct_alumnos as fct inner join alumnos as al on al.id= fct.alumno_id 
        inner join cursos as c on c.id=al.curso_id inner join empresas as em on em.id= fct.empresa_id 
        inner join responsables as resp on resp.id= fct.responsable_id 
        inner join 
            tutores as tutor  on  tutor.id = fct.tutor_id where fct.empresa_id= ? and fct.codigoCentro=?;",[$empresa,$codigo->codigoCentro]);
    }


}
