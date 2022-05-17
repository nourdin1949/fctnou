<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresas extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombreEmpresa',
        'provincia',
        'localidad',
        'calle',
        'cp',
        'cif',
        'telefono',
        'email',
        'dniRepresentante',
        'nombreRepresentante'
    ];
    
}
