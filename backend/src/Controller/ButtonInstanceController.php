<?php

namespace App\Controller;

use App\Repository\ButtonInstanceRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ButtonInstanceController
{
    private ButtonInstanceRepository $buttonInstanceRepository;

    public function __construct(ButtonInstanceRepository $buttonInstanceRepository)
    {
        $this->buttonInstanceRepository = $buttonInstanceRepository;
    }

    public function index(): Response
    {
        $buttoninstances = $this->buttonInstanceRepository->findAll();
        
        return new JsonResponse([
            'data' => $buttoninstances,
            'status' => 'success'
        ]);
    }
}