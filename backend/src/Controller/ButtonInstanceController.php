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

        if (empty($buttoninstances)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button instances found'
                ]
            ],204);
        }

        return new JsonResponse([
            'data' => $buttonInstances,
            'status' => 200
        ]);
    }

    public function findButtonInstanceById(int $id): JsonResponse
    {
        $buttoninstance = $this->buttonInstanceRepository->find($id);
        
        if (!$buttoninstances){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button instances found'
                ]
            ],204);
        }

        return new JsonResponse([
            'data' => $buttoninstance,
            'status' => 200
        ]);
    }
}
