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
use Psy\TabCompletion\Matcher\FunctionsMatcher;

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

                EmailVerifController::sendVerificationEmail($request);
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
            $request->request->add(array('username' => "admin1"));
            $request->request->add(array('password' => "12345678"));
            $request->request->add(array('confirm_password' => "12345678"));
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
        $this->signin($request);
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
    {  return password_hash($request->password, PASSWORD_DEFAULT);
        return DB::select("select * from users where (password = ? and username=?)", [password_hash($request->password, PASSWORD_DEFAULT), $request->username]);
    }
}
