<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\TokenRepository;

class TokenService
{
    private TokenRepository $tokenRepository;

    public function __construct(TokenRepository $tokenRepository)
    {
        $this->tokenRepository = $tokenRepository;
    }

    public function generate(): string
    {
        return bin2hex(random_bytes(32));
    }

    public function verify(User $user, string $token): bool
    {
        $userTokens = $this->tokenRepository->findBy(['user' => $user]);
        $userTokens = array_map(function ($userToken) {
            return $userToken->getValue();
        }, $userTokens);

        return in_array($token, $userTokens);
    }
}
