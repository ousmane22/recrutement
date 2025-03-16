<?php

namespace App\Services\Auth;

use Auth;

class AuthService implements IAuthService
{
    // protected $userRepository;

    // public function __construct(IUserRepository $userRepository)
    // {
    //     $this->userRepository = $userRepository;
    // }

    public function login(array $credentials)
    {
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
    
            $token = $user->createToken('jefjel', ['*'], now()->addHours(2))->plainTextToken;
            
            return [
                'token' => $token,
                'user' => $user
            ];
        }
    
        return null;
    }
}
