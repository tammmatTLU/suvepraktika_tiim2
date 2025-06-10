<?php

namespace App\Controller;

use App\Repository\ButtonInstanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ButtonInstanceController extends AbstractController
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