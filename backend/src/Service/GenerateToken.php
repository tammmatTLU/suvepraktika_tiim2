<?php

namespace App\Service;

class GenerateToken
{
    public function generateToken(): string
    {
        return bin2hex(random_bytes(32));
    }
}
