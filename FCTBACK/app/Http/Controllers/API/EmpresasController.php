<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
        //
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
        //
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
}
