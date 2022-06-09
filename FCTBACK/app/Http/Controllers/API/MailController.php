<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestMail;
class MailController extends Controller
{
    
    public static function sendEmailRegister($user,$password){
        $details=[
            'title'=>'Bienvenido a FCTNOU',
            'body'=>'Has sido dado de alta en la web con los siguientes datos: ',
            'salutation'=>'¡Un saludo!',
            'password' => 'Password:  '. $password,
            'username'=>'Username: '. $user->username
        ];
        
        Mail::to($user->email)->send(new TestMail($details));
        return "Usuario registrado con éxito";
    }
}
