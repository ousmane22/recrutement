<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
Route::get('/', function () {
    return view('welcome');
});


Route::get('/test-email', function () {
    Mail::raw('Ceci est un test d\'envoi d\'email avec Gmail.', function ($message) {
        $message->to('ousmanend2211@gmail.com')
                ->subject('Test Email Laravel avec Gmail');
    });

    return 'E-mail envoyé avec succès!';
});