<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\API\MailController as APIMailController;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;
use App\Http\Controllers\Controller\MailController;

class AuthController extends BaseController
{
    public function signin(Request $request)
    {
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $authUser = Auth::user();
            $success['token'] =  $authUser->createToken('MyAuthApp')->plainTextToken;
            $success['token'];
            $success['username'] =  $authUser->username;

            return $this->sendResponse($success, 'User signed in');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
    public function signup(Request $request)
    {
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

        return APIMailController::sendEmailRegister($user, $password);
    }
    public function logout()
    {
        Auth::logout();
        return "Cerrando sesion";
    }
}
