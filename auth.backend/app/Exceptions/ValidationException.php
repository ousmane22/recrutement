<?php

namespace App\Exceptions;

use Exception;

class ValidationException extends Exception
{
    protected $message;
    protected $code;

    public function __construct($message = "Validation failed.", $code = 400)
    {
        $this->message = $message;
        $this->code = $code;
        parent::__construct($this->message, $this->code);
    }
}
