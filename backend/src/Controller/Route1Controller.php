<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class Route1Controller
{
    public function index(): Response
    {
        return new Response('route1 töötab');
    }
}
