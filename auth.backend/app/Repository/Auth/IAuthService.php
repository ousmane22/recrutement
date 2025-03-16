<?php

namespace App\Services\Auth;

interface IAuthService
{
    public function login(array $data);
}