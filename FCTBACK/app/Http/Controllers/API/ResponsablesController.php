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
        DB::update('update fct_alumnos set empresa_id = ? where responsable_id =?',[$responsable->empresa_id, $id]);
        
        $responsable->save();

        
    }

    /**
     * Remove the specified resource from storage.
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

    public function modificarEmpresaPractica($idResponsable, $idEmpresa){
        return "hola". $idEmpresa;   
    
    }
}
