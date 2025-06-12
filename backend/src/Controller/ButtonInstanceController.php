<?php

namespace App\Controller;

use App\Repository\ButtonInstanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ButtonInstanceController extends AbstractController
{
    private ButtonInstanceRepository $buttonInstanceRepository;

    public function __construct(ButtonInstanceRepository $buttonInstanceRepository)
    {
        $this->buttonInstanceRepository = $buttonInstanceRepository;
    }

    public function findAllButtonInstances(): JsonResponse
    {
        $buttoninstances = $this->buttonInstanceRepository->findAll();

        return new JsonResponse([
            'data' => $buttoninstances,
            'status' => 200
        ]);
    }

    public function FindButtonInstanceById(int $id): JsonResponse
    {
        $buttonInstance = $this->buttonInstanceRepository->find($id);

        return new JsonResponse([
            'data' => $buttonInstance,
            'status' => 200
        ]);
    }
}
