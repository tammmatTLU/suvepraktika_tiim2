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

        if (empty($buttonInstances)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button instances found'
                ]
            ],204);
        }

        $data = array_map(function($buttonInstance) {
            return $buttonInstance->serialize();
        }, $buttonInstances);

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }

    public function findButtonInstanceById(int $id): JsonResponse
    {
        $buttoninstance = $this->buttonInstanceRepository->find($id);
        
        if (!$buttonInstance){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button instance found'
                ]
            ],204);
        }

        $data = $buttonInstance->serialize();

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }
}
