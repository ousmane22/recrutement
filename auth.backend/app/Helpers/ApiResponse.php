<?php

namespace App\Helpers;

class ApiResponse
{
    public static function sendResponse($message, $status, $data = null)
    {
        return response()->json([
            'message' => $message,
            'status' => $status,
            'data' => $data
        ], $status);
    }
}
