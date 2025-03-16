<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Helpers\ApiResponse;
use App\Constants\HttpStatus;

class ProcessPasswordReset
{
    public function handle(array $data)
    {
        try {
            $status = Password::reset(
                $data,
                function (User $user, string $password) {
                    $user->forceFill([
                        'password' => Hash::make($password),
                    ])->save();

                    $user->tokens()->delete();

                    $token = $user->createToken('password-reset')->plainTextToken;

                    return ApiResponse::sendResponse(
                        'Votre mot de passe a été réinitialisé avec succès.',
                        HttpStatus::SUCCESS,
                        ['token' => $token, 'user' => $user]
                    );
                }
            );

            if ($status == Password::PASSWORD_RESET) {
                return ApiResponse::sendResponse(
                    'Votre mot de passe a été réinitialisé avec succès.',
                    HttpStatus::SUCCESS
                );
            }

            return ApiResponse::sendResponse(
                'Le lien de réinitialisation est invalide ou a expiré.',
                HttpStatus::BAD_REQUEST
            );
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(
                'Une erreur est survenue lors du traitement de la réinitialisation du mot de passe.',
                HttpStatus::INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }
    }
}
