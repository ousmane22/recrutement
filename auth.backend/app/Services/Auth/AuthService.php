<?php

namespace App\Services\Auth;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use App\Constants\HttpStatus;

class AuthService
{
    public function login(array $credentials)
    {
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('entretien', ['*'], now()->addHours(2))->plainTextToken;

            return response()->json([
                'message' => 'User logged in successfully',
                'status' => HttpStatus::SUCCESS,
                'data' => [
                    'token' => $token,
                    'user' => $user
                ]
            ], HttpStatus::SUCCESS);
        }

        return response()->json([
            'message' => 'Invalid credentials.',
            'status' => HttpStatus::BAD_REQUEST,
            'data' => null
        ], HttpStatus::BAD_REQUEST);
    }

    public function register(array $data)
    {
        try {
            $validator = \Validator::make($data, [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed.',
                    'status' => HttpStatus::BAD_REQUEST,
                    'data' => $validator->errors()
                ], HttpStatus::BAD_REQUEST);
            }

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            return response()->json([
                'message' => 'User registered successfully',
                'status' => HttpStatus::SUCCESS,
                'data' => $user
            ], HttpStatus::SUCCESS);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred during registration.',
                'status' => HttpStatus::INTERNAL_SERVER_ERROR,
                'data' => $e->getMessage()
            ], HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    public function forgotPassword(string $email)
    {
        Mail::to($email)->send(new ResetPasswordMail());
        // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        //     return response()->json([
        //         'message' => 'The provided email is invalid.',
        //         'status' => HttpStatus::BAD_REQUEST,
        //         'data' => null
        //     ], HttpStatus::BAD_REQUEST);
        // }

        // try {
        //     $status = Password::sendResetLink(['email' => $email]);

        //     if ($status == Password::RESET_LINK_SENT) {
        //         return response()->json([
        //             'message' => 'A password reset link has been sent to your email address.',
        //             'status' => HttpStatus::SUCCESS,
        //             'data' => null
        //         ], HttpStatus::SUCCESS);
        //     }

        //     return response()->json([
        //         'message' => 'Failed to send the reset link. Please check the email address.',
        //         'status' => HttpStatus::BAD_REQUEST,
        //         'data' => null
        //     ], HttpStatus::BAD_REQUEST);
        // } catch (\Exception $e) {
        //     return response()->json([
        //         'message' => 'An error occurred while sending the reset link.',
        //         'status' => HttpStatus::INTERNAL_SERVER_ERROR,
        //         'data' => $e->getMessage()
        //     ], HttpStatus::INTERNAL_SERVER_ERROR);
        // }
    }

    public function resetPassword(array $data)
    {
        $validated = \Validator::make($data, [
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        if ($validated->fails()) {
            throw new ValidationException($validated);
        }

        $status = Password::reset(
            $data,
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();

                $user->tokens()->delete();

                $token = $user->createToken('password-reset')->plainTextToken;

                return response()->json([
                    'message' => 'Your password has been successfully reset.',
                    'status' => HttpStatus::SUCCESS,
                    'data' => [
                        'token' => $token,
                        'user' => $user
                    ]
                ], HttpStatus::SUCCESS);
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Your password has been successfully reset.',
                'status' => HttpStatus::SUCCESS,
                'data' => null
            ], HttpStatus::SUCCESS);
        }

        return response()->json([
            'message' => 'The reset link is invalid or has expired.',
            'status' => HttpStatus::BAD_REQUEST,
            'data' => null
        ], HttpStatus::BAD_REQUEST);
    }

    public function logout($user)
    {
        $user->tokens()->delete();
        return response()->json([
            'message' => 'Logged out successfully',
            'status' => HttpStatus::SUCCESS,
            'data' => null
        ], HttpStatus::SUCCESS);
    }
}
