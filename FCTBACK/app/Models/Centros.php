<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Centros extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'codigo',
        'nombreCentro',
        'provincia',
        'localidad',
        'calle',
        'cp',
        'cif',
        'telefono',
        'email',
        'nombreDirector'
    ];
}
