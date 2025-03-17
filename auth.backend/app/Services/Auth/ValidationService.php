<?php
namespace App\Services\Auth;

use Illuminate\Support\Facades\Validator;

class ValidationService
{

    public function validateRegistration(array $data)
    {
        return Validator::make($data, [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',  
            'dateOfBirth' => 'required|date|before:today',
            'country' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
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
