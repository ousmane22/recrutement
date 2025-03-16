<?php
namespace App\Services\Email;

use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    public function sendResetPasswordEmail(string $email, string $userName, string $resetUrl)
    {
        Mail::to($email)->send(new ResetPasswordMail($userName, $resetUrl));
    }
}
