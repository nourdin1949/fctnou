<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Centros;
use Illuminate\Support\Facades\DB;

class CentrosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::select("SELECT * FROM centros where activo =1");
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
        $centros = new Centros();
        $centros->codigo = $request->input('codigo');
        $centros->nombreCentro = $request->input('nombreCentro');
        $centros->provincia = $request->input('provincia');
        $centros->localidad = $request->input('localidad');
        $centros->calle = $request->input('calle');
        $centros->cp = $request->input('cp');
        $centros->cif = $request->input('cif');
        $centros->telefono = $request->input('telefono');
        $centros->email = $request->input('email');
        $centros->nombreDirector = $request->input('nombreDirector');
        return $centros->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DB::select("select * from centros where codigo=?", [$id])[0];
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

        $centros = DB::select("select * from centros where codigo=?", [$id])[0];
        $centros->nombreCentro = $request->input('nombreCentro');
        $centros->provincia = $request->input('provincia');
        $centros->localidad = $request->input('localidad');
        $centros->calle = $request->input('calle');
        $centros->cp = $request->input('cp');
        $centros->cif = $request->input('cif');
        $centros->telefono = $request->input('telefono');
        $centros->email = $request->input('email');
        $centros->nombreDirector = $request->input('nombreDirector');
        return DB::update(
            "update centros set nombreCentro=?, provincia=?,localidad=?,
             calle=?, cp=?, cif=?, telefono=?, email=?, nombreDirector=? where codigo=?",
            [
                $centros->nombreCentro, $centros->provincia, $centros->localidad, $centros->calle,
                $centros->cp, $centros->cif, $centros->telefono, $centros->email, $centros->nombreDirector,
                $centros->codigo
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return DB::delete("DELETE FROM centros where codigo=? ",[$id]);
    }

    public function findCentroBycode($code){
         $codigo = DB::select("select codigoCentro from tutores where id=?", [$code])[0];
        return DB::select("select * from centros where codigo=?", [$codigo->codigoCentro])[0];
    }
}
