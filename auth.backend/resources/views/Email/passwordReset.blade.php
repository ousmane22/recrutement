@component('mail::message')
# Réinitialisation de votre mot de passe

Bonjour {{ $userName }},

Cliquez sur ce lien ci-dessous pour réinitialiser votre mot de passe {{ config('app.name') }}.

@component('mail::button', ['url' => $resetUrl])
Réinitialisation du mot de passe
@endcomponent

Si vous n'avez pas demandé à réinitialiser votre mot de passe, vous pouvez ignorer cet e-mail.

À très bientôt,

L'équipe {{ config('app.name') }}
@endcomponent