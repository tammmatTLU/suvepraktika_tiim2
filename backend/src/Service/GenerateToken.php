<?php

namespace App\Service;

use App\Entity\Token;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class GenerateToken
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function generateToken(User $user): string
    {
        $tokenValue = bin2hex(random_bytes(32));

        $token = $user->getToken();
        if (!$token) {
            $token = new Token();
            $token->setUser($user);
            $user->setToken($token);
        }
        $token->setValue($tokenValue);

        $this->entityManager->persist($token);
        $this->entityManager->flush();

        return $tokenValue;
    }
}
