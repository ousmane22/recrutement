<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\Auth\AuthService;
use Illuminate\Http\Request;
use App\Constants\HttpStatus;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        return $this->authService->login($credentials);
    }

    public function register(Request $request)
    {
        $data = $request->all();
        return $this->authService->register($data);
    }

    public function forgotPassword(Request $request)
    {
        $email = $request->input('email');
        return $this->authService->forgotPassword($email);
    }

    public function resetPassword(Request $request)
    {
        $data = $request->all();
        return $this->authService->resetPassword($data);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        return $this->authService->logout($user);
    }
}
