<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\API\MailController as APIMailController;
use App\Http\Controllers\API\EmailVerificationController as EmailVerifController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

class AuthController extends BaseController
{
    public function signin(Request $request)
    {
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $authUser = Auth::user();
            if ($authUser->activo == "1") {

                $success['token'] =  $authUser->createToken('MyAuthApp')->plainTextToken;
                $success['token'];
                $success['username'] =  $authUser->username;
                $success['user'] = $authUser;
                $request->request->add(array('user' => $authUser));


                return $this->sendResponse($success, 'User signed in');
            }
            if ($authUser->activo == "0") {
                return $this->sendError('Cuenta desactivada', ['desactivada' => 'Cuenta desactivada ']);
            }
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
    public function signup(Request $request)
    {
        $users = DB::select("select * from users ");
        if ($users == []) {
            $request->request->add(array('username' => "admin"));
            $request->request->add(array('password' => "Aa123456"));
            $request->request->add(array('confirm_password' => "Aa123456"));
            $request->request->add(array('email' => "nelqaddoury01@gmail.com"));
            $request->request->add(array('perfil' => "admin"));
            $request->request->add(array('activo' => "1"));
        }
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
            'perfil' => 'required',
            'activo' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }

        $input = $request->all();
        $password = $input['password'];
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyAuthApp')->plainTextToken;
        $success['username'] =  $user->username;
        $request->request->add(array('token' => $success['token']));
        APIMailController::sendEmailRegister($user, $password);
        event(new Registered($user));
    }
    public function logout()
    {
        return Auth::logout();
        return "Cerrando sesion";
    }

    public function getUsers()
    {
        return User::all();
    }

    public function getUser($email)
    {
        return DB::select("select * from users where email = ?", [$email]);
    }


    public function userBypasswordAndUsername(Request $request)
    {
        return password_hash($request->password, PASSWORD_DEFAULT);
        return DB::select("select * from users where (password = ? and username=?)", [password_hash($request->password, PASSWORD_DEFAULT), $request->username]);
    }

    public function subirImagen(Request $request, $username, $id)
    {
        if (!$request->hasFile('image')  &&  !$request->file('image')->isValid()) {
            return response()->json('{"error":"suba una imagen"}');
        }
        $file = $request->file('image');
        $picture = $username . ".png";
        $file->move(public_path('img'), $picture);
        DB::update("UPDATE users SET foto=1 where id=? ", [$id]);
        return response()->json(["message" => "Image Uploaded Succesfully"]);
    }

    public function validarEmail($email)
    {
        $tutores = DB::select("SELECT * from tutores where email=?", [$email]);
        $alumnos = DB::select("SELECT * from alumnos where email=?", [$email]);
        $responsables = DB::select("SELECT * from responsables where email=?", [$email]);
        if ($responsables == [] && $tutores == [] && $alumnos == []) {
            return null;
        }
        return true;
    }
    public function validarDNI($dni)
    {
        $tutores = DB::select("SELECT * from tutores where dniTutor=?", [$dni]);
        $alumnos = DB::select("SELECT * from alumnos where dniAlumno=?", [$dni]);
        $responsables = DB::select("SELECT * from responsables where dniResponsable=?", [$dni]);
        if ($responsables == [] && $tutores == [] && $alumnos == []) {
            return null;
        }
        return true;
    }
    public function validarEmailByID($email, $id)
    {
        $Todostutores = DB::select("SELECT * from tutores where email=?", [$email]);
        $tutores = DB::select("SELECT * from tutores where email=? && id=?", [$email, $id]);
        $Todosalumnos = DB::select("SELECT * from alumnos where email=? ", [$email]);
        $alumnos = DB::select("SELECT * from alumnos where email=? && id=?", [$email, $id]);
        $Todosresponsables = DB::select("SELECT * from responsables where email=?", [$email, $email, $id]);
        $responsables = DB::select("SELECT * from responsables where email=? && id=?", [$email, $id]);
        if ($responsables == [] && $tutores == [] && $alumnos == []) {
            return null;
        }
        if (count($Todosresponsables) == 1 || count($alumnos) == 1 || count($tutores) == 1) {
            return null;
        }
        return true;
    }
    public function checkifDNIByID($dni, $id)
    {
        $Todostutores = DB::select("SELECT * from tutores where dniTutor=?", [$dni]);
        $tutores = DB::select("SELECT * from tutores where dniTutor=? && id=?", [$dni, $dni, $id]);
        $Todosalumnos = DB::select("SELECT * from alumnos where dniAlumno=? ", [$dni]);
        $alumnos = DB::select("SELECT * from alumnos where dniAlumno=? && id=?", [$dni, $id]);
        $Todosresponsables = DB::select("SELECT * from responsables where dniResponsable=? ", [$dni]);
        $responsables = DB::select("SELECT * from responsables where dniResponsable=? && id=?", [$dni, $id]);
        if ($responsables == [] && $tutores == [] && $alumnos == []) {
            return null;
        }
        if (count($Todosresponsables) == 1 || count($Todosalumnos) == 1 || count($Todostutores) == 1) {
            return null;
        }
        return true;
    }

    public function checkifexistcifCentro($cif)
    {
        $Todoscentros = DB::select("SELECT * from centros where cif=? ", [$cif]);

        if ($Todoscentros == []) return null;
        return true;
    }

    public function checkifexistcifCentroBYID($cif, $id)
    {
        $Todoscentros = DB::select("SELECT * from centros where cif=? ", [$cif]);
        $centros = DB::select("SELECT * from centros where 
            cif=? && codigo=?", [$cif,  $id]);
        if ($Todoscentros == []) return null;
        if (count($centros) == 1) return null;
        return true;
    }

    public function checkifEmpresaDNIBYID($dni, $id)
    {
        $empresa = DB::select("SELECT * from empresas where dniRepresentante=? && id=?", [$dni, $id]);
        $Todosempresa = DB::select("SELECT * from empresas where dniRepresentante=? ", [$dni]);

        if (count($empresa) == 1 || $Todosempresa == []) {
            return null;
        }
        return true;
    }
    public function checkifEmpresaDNI($dni)
    {
        $empresa = DB::select("SELECT * from empresas where dniRepresentante=? ", [$dni]);

        if ($empresa == []) {
            return null;
        }
        return true;
    }
    public function checkifEmpresaCIFBYID($cif, $id)
    {
        $empresa = DB::select("SELECT * from empresas where cif=? && id=?", [$cif, $id]);
        $Todosempresa = DB::select("SELECT * from empresas where cif=? ", [$cif]);

        if (count($empresa) == 1 || $Todosempresa == []) {
            return null;
        }
        return true;
    }
    public function checkifEmpresaCIF($cif)
    {
        $empresa = DB::select("SELECT * from empresas where cif=? ", [$cif]);

        if ($empresa == []) {
            return null;
        }
        return true;
    }
    public function checkifAlumnoPractica($id)
    {
        $alumno = DB::select("SELECT * from fct_alumnos where alumno_id=? ", [$id]);

        if ($alumno == []) {
            return null;
        }
        return true;
    }
    public function checkifUsersExist($dni)
    {
        $user = DB::select("SELECT * from users where username=? ", [$dni]);

        if ($user == []) {
            return null;
        }
        return true;
    }
}
