<?php

namespace App\Service;

use App\Entity\User;

class TokenService
{
    public function generate(): string
    {
        return bin2hex(random_bytes(32));
    }

    public function verify(User $user, string $token): bool
    {
        $userTokens = $user->getTokens();

        return $userTokens->contains($token);
    }
}
