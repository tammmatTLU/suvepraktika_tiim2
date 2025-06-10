<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class Route3Controller
{
    public function index(): Response
    {
        return new Response('route3 töötab');
    }
}
