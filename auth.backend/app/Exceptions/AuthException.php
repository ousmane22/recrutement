<?php

namespace App\Exceptions;

use Exception;

class AuthException extends Exception
{
    protected $message;
    protected $code;

    public function __construct($message = "An error occurred during authentication.", $code = 500)
    {
        $this->message = $message;
        $this->code = $code;
        parent::__construct($this->message, $this->code);
    }
}

