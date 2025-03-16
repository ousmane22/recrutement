<?php
namespace App\Services\Auth;

use Illuminate\Support\Facades\Validator;

class ValidationService
{

    public function validateRegistration(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
    }


    public function validateResetPassword(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);
    }
}
