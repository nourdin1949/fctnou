<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;;
use App\Models\Empresas;

class EmpresasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Empresas::all();
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
        //
        $empresa = new Empresas();
        $empresa->nombreEmpresa = $request->input('nombreEmpresa');
        $empresa->provincia = $request->input('provincia');
        $empresa->localidad = $request->input('localidad');
        $empresa->calle = $request->input('calle');
        $empresa->cp = $request->input('cp');
        $empresa->cif = $request->input('cif');
        $empresa->telefono = $request->input('telefono');
        $empresa->email = $request->input('email');
        $empresa->dniRepresentante = $request->input('dniRepresentante');
        $empresa->nombreRepresentante = $request->input('nombreRepresentante');

        return $empresa->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Empresas::findOrFail($id);
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
        $empresa = Empresas::find($id);

        $empresa->nombreEmpresa = $request->input('nombreEmpresa');
        $empresa->provincia = $request->input('provincia');
        $empresa->localidad = $request->input('localidad');
        $empresa->calle = $request->input('calle');
        $empresa->cp = $request->input('cp');
        $empresa->telefono = $request->input('telefono');
        $empresa->email = $request->input('email');
        $empresa->dniRepresentante = $request->input('dniRepresentante');
        $empresa->nombreRepresentante = $request->input('nombreRepresentante');
        return $empresa->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $ids
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {   
        Empresas::destroy($id);
    }

    public function listarAlumnosEmpresa($id){
        return DB::select("select count(fct.empresa_id) as total , fct.empresa_id from fct_alumnos as fct inner join 
            alumnos as al on al.id= fct.alumno_id inner join cursos as c on c.id=al.curso_id inner join
                empresas as em on em.id= fct.empresa_id inner join responsables as resp on resp.id= fct.responsable_id
                     inner join tutores as tutor on tutor.id = fct.tutor_id where fct.empresa_id=? group by fct.empresa_id; ",[$id]);
    }
}
