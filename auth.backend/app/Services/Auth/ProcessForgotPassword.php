<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Password;
use App\Helpers\ApiResponse;
use App\Services\Email\EmailService;
use App\Constants\HttpStatus;

class ProcessForgotPassword
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function handle(string $email)
    {
        try {
            $user = User::where('email', $email)->first();

            if ($user) {
                $token = Password::createToken($user);

                $frontendUrl = url('http://localhost:4200');  
                $url = $frontendUrl . '/reset-password?token=' . $token . '&email=' . urlencode($email);
                
                $this->emailService->sendResetPasswordEmail($email, $user->name, $url);

                return ApiResponse::sendResponse(
                    __('messages.password_reset_sent'),
                    HttpStatus::SUCCESS
                );
            }

            return ApiResponse::sendResponse(
                __('messages.user_not_found'),
                HttpStatus::BAD_REQUEST
            );
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(
                __('messages.reset_link_error'), 
                HttpStatus::INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }
    }
}
