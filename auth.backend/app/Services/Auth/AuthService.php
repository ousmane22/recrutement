<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Services\Email\EmailService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Constants\HttpStatus;
use App\Exceptions\AuthException;
use App\Exceptions\ValidationException as CustomValidationException;
use App\Helpers\ApiResponse;

class AuthService
{
    protected $validationService;
    protected $emailService;
    protected $processForgotPassword;
    protected $processPasswordReset;

    public function __construct(
        ValidationService $validationService, 
        EmailService $emailService,
        ProcessForgotPassword $processForgotPassword,
        ProcessPasswordReset $processPasswordReset
    )
    {
        $this->validationService = $validationService;
        $this->emailService = $emailService;
        $this->processForgotPassword = $processForgotPassword;
        $this->processPasswordReset = $processPasswordReset;
    }

    public function login(array $credentials)
    {
        try {
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $this->generateToken($user);

                return $this->sendLoginResponse($user, $token);
            }

            throw new AuthException("Identifiants invalides.", HttpStatus::BAD_REQUEST);
        } catch (AuthException $e) {
            return ApiResponse::sendResponse(
                $e->getMessage(),
                $e->getCode()
            );
        }
    }

    public function register(array $data)
    {
        try {
            $validation = $this->validateRegistration($data);

            if ($validation->fails()) {
                throw new CustomValidationException('Échec de la validation.', HttpStatus::BAD_REQUEST);
            }

            return $this->createUser($data);
        } catch (CustomValidationException $e) {
            return ApiResponse::sendResponse(
                $e->getMessage(),
                $e->getCode()
            );
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(
                'Une erreur est survenue lors de l\'inscription.',
                HttpStatus::INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }
    }

    public function logout($user)
    {
        try {
            $this->deleteUserTokens($user);
            return $this->sendLogoutResponse();
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(
                'Une erreur est survenue lors de la déconnexion.',
                HttpStatus::INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }
    }

    protected function attemptLogin(array $credentials)
    {
        return Auth::attempt($credentials);
    }

    protected function generateToken($user)
    {
        return $user->createToken('entretien', ['*'], now()->addHours(2))->plainTextToken;
    }

    protected function sendLoginResponse($user, $token)
    {
        return ApiResponse::sendResponse(
            'Utilisateur connecté avec succès',
            HttpStatus::SUCCESS,
            ['token' => $token, 'user' => $user]
        );
    }

    protected function sendInvalidCredentialsResponse()
    {
        throw new AuthException('Identifiants invalides.', HttpStatus::BAD_REQUEST);
    }

    protected function validateRegistration(array $data)
    {
        return $this->validationService->validateRegistration($data);
    }

    protected function createUser(array $data)
    {
        try {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            return ApiResponse::sendResponse(
                'Utilisateur inscrit avec succès',
                HttpStatus::SUCCESS,
                $user
            );
        } catch (\Exception $e) {
            throw new \Exception('Une erreur est survenue lors de l\'inscription.');
        }
    }

    protected function isValidEmail($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    protected function validateResetPassword(array $data)
    {
        return $this->validationService->validateResetPassword($data);
    }

    protected function deleteUserTokens($user)
    {
        $user->tokens()->delete();
    }

    protected function sendLogoutResponse()
    {
        return ApiResponse::sendResponse(
            'Déconnexion réussie',
            HttpStatus::SUCCESS
        );
    }

    public function forgotPassword(string $email)
    {
        return $this->processForgotPassword->handle($email);
    }

    public function resetPassword(array $data)
    {
        return $this->processPasswordReset->handle($data);
    }
}
