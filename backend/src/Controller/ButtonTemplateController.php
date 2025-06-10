<?php

namespace App\Controller;

use App\Repository\ButtonTemplateRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ButtonTemplateController
{
    private ButtonTemplateRepository $buttonTemplateRepository;

    public function __construct(ButtonTemplateRepository $buttonTemplateRepository)
    {
        $this->buttonTemplateRepository = $buttonTemplateRepository;
    }

    public function index(): Response
    {
        $buttontemplates = $this->buttonTemplateRepository->findAll();
        
        return new JsonResponse([
            'data' => $buttontemplates,
            'status' => 'success'
        ]);
    }
}