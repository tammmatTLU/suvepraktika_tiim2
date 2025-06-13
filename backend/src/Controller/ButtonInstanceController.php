<?php

namespace App\Controller;

use App\Repository\ButtonInstanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

final class ButtonInstanceController extends AbstractController
{
    private ButtonInstanceRepository $buttonInstanceRepository;

    public function __construct(ButtonInstanceRepository $buttonInstanceRepository)
    {
        $this->buttonInstanceRepository = $buttonInstanceRepository;
    }

    public function findAllButtonInstances(): JsonResponse
    {
        $buttonInstances = $this->buttonInstanceRepository->findAll();

        return new JsonResponse([
            'data' => $buttonInstances,
            'status' => 200
        ]);
    }
}
