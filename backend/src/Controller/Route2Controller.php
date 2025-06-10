<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class Route2Controller
{
    public function index(): Response
    {
        return new Response('route2 töötab');
    }
}
