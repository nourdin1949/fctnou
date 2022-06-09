<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class EmailVerificationController extends Controller
{

    public function sendVerificationEmail(Request $request)
    {
        $id = json_decode($request->user)->id;
         if (User::findOrFail($id)->email_verified_at!=null) {
            return [
                'message' => 'Email already verified'
            ];
        }

        User::findOrFail($id)->sendEmailVerificationNotification();

        return ['status' => 'verification-link-sent'];
    }



    public function verify(EmailVerificationRequest $request)
    {
        
        if ($request->user()->hasVerifiedEmail()) {
            return [
                'message' => 'Email already verified'
            ];
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return [
            'message'=>'Email has been verified'
        ];
    }


    public function verificar(Request $request){
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $authUser = Auth::user();
            if ($authUser->activo == "1") {
                DB::update("UPDATE users set email_verified_at =CURRENT_TIMESTAMP where email=? AND username=?",[$request->email, $request->username]);
                return [
                    'message'=>'Email has been verified'
                ];
            }
            if ($authUser->activo == "0") {
                return [
                    'message'=>'error'
                ];
            }
        } else {
            return [
                'message'=>'error'
            ];
        }
        
    }
}