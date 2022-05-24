<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\EmailVerificationController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EmpresasController;
use App\Http\Controllers\API\NewPasswordController;
use App\Http\Controllers\API\CentrosController;
use App\Http\Controllers\API\CursosController;
use App\Http\Controllers\API\TutoresController;
use App\Http\Controllers\API\ResponsablesController;
use App\Http\Controllers\API\AlumnosController;
use App\Http\Controllers\API\ChatController;
use App\Http\Controllers\API\FctAlumnosController;
use App\Http\Controllers\API\TareasController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Ruta de inicio de sesión
Route::post('login', [AuthController::class, 'signin']);
//Ruta para dar de alta a un usuario
Route::post('register', [AuthController::class, 'signup']);

//Ruta que dará de alta a un usuario con rol admin  por defecto
Route::get('', [AuthController::class, 'signup']);
//Ruta para cerrar sesión
Route::get('logout', [AuthController::class, 'logout']);

//Ruta para enviar link para verificar el correo 
Route::post('email/verification-notification', [EmailVerificationController::class, 'sendVerificationEmail'])->middleware('auth:sanctum');
//Ruta para verificar del correo
Route::get('verify-email/{id}/{hash}', [EmailVerificationController::class, 'verify'])->name('verification.verify')->middleware('auth:sanctum');
//Ruta para enviar link de recuperación de contraseña
Route::post('forgot-password', [NewPasswordController::class, 'forgotPassword']);
//Ruta para cambiar la contraseña 
Route::post('reset-password', [NewPasswordController::class, 'reset']);
Route::get('users', [AuthController::class, 'getUsers']);

################################### ADMIN  ###################################


Route::middleware('auth:sanctum')->group(function(){
    // EMPRESA
    Route::controller(EmpresasController::class)->group(function () {
        Route::post('insertarEmpresa', 'store');
        Route::get('listarEmpresas', 'index');
        Route::get('findEmpresaByid/{id}', 'show');
        Route::get('listarAlumnosEmpresa/{id}', 'listarAlumnosEmpresa');
        Route::put('updateEmpresaById/{id}', 'update');
        Route::delete('eliminarEmpresa/{id}', 'destroy');
    });
    // CENTRO
    Route::controller(CentrosController::class)->group(function () {
        Route::post('insertarCentro', 'store');
        Route::get('listarCentros',  'index');
        Route::get('findCentroByid/{id}', 'show');
        Route::put('updateCentroById/{id}', 'update');
        Route::delete('eliminarCentro/{id}', 'destroy');
    });
    // TUTORES
    Route::controller(TutoresController::class)->group(function () {
        Route::post('insertarTutor', 'store');
        Route::post('getIdByDniUserTutor', 'getIdUser');
        Route::get('listarTutores', 'index');
        Route::get('findTutorByid/{id}', 'show');
        Route::get('alumosTutor/{id}', 'alumnoTutor');
        Route::put('validaTareaTutor/{id}', 'validaTareaTutor');
        Route::put('updateTutorById/{id}', 'update');
        Route::delete('eliminarTutor/{id}', 'destroy');
    });
    // CURSOS
    Route::controller(CursosController::class)->group(function () {
        Route::post('insertarCurso', 'store');
        Route::get('listarCursos', 'index');
        Route::get('findCursoById/{id}', 'show');
        Route::put('updateCursoById/{id}', 'update');
        Route::delete('eliminarCurso/{id}', 'destroy');
    });
    // RESPONSABLES
    Route::controller(ResponsablesController::class)->group(function () {
        Route::post('insertarResponsable', 'store');
        Route::post('getIdByDniUserResposable', 'getIdResposable');
        Route::get('listarResponsables', 'index');
        Route::get('findResponsableByid/{id}', 'show');
        Route::get('findResponsablesByEmpresaID/{id}', 'findResponsablesByEmpresaID');
        Route::get('alumosResponsable/{id}', 'alumosResponsable');
        Route::put('validaTareaResponsable/{id}', 'validaTareaResponsable');
        Route::put('updateResponsableById/{id}', 'update');
        Route::delete('eliminarResponsable/{id}', 'destroy');
    });
    // ALUMNOS
    Route::controller(AlumnosController::class)->group(function () {
        Route::post('insertarAlumno', 'store');
        Route::post('getIdByDniUser', 'getIdUser');
        Route::get('listarAlumnos', 'index');
        Route::get('findAlumnoByid/{id}', 'show');
        Route::put('updateAlumnoByid/{id}', 'update');
        Route::delete('eliminarAlumno/{id}', 'destroy');
    });
    // ALUMNOS FCT ##ALUMNOS EN PRÁCTICA##
    Route::controller(FctAlumnosController::class)->group(function () {
        Route::post('insertarAlumnoFCT', 'store');
        Route::get('listarAlumnosFCT', 'listarfct');
        Route::put('modificarAlumnoFCT/{id}', 'update');
        Route::delete('eliminarAlumnoFCT/{id}', 'destroy');
    });
    // TAREAS
    Route::controller(TareasController::class)->group(function () {
        Route::post('insertarTareas', 'store');
        Route::get('listarTareasPorIDAlumno/{id}', 'show');
        Route::post('listarTareasEntreFechas/{id}', 'listarTareasEntreFechas');
        Route::get('listarTareasPorFecha/{fecha}', 'listarTareasPorFecha');
        Route::get('listarTareasPorID/{id}', 'listarTareasPorID');
        Route::get('fichasemanal/{id}', 'fichasemanal');
        Route::put('modificarTareaAlumno/{id}', 'update');
        Route::delete('eliminarTareaAlumno/{id}', 'destroy');
    });
    // TAREAS
    Route::controller(ChatController::class)->group(function () {
        Route::post('insertarChat', 'store');
        Route::get('listarChat', 'index');
        
    });
});


