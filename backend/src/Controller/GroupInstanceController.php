<?php

namespace App\Controller;

use App\Repository\GroupInstanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class GroupInstanceController extends AbstractController
{
    private GroupInstanceRepository $groupInstanceRepository;

    public function __construct(GroupInstanceRepository $groupInstanceRepository)
    {
        $this->groupInstanceRepository = $groupInstanceRepository;
    }

    public function findAllGroupInstances(): JsonResponse
    {
        $groupInstances = $this->groupInstanceRepository->findAll();

        if($groupInstance -> isEmpty()){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No groups instances found'
                ]
            ], 204);
        }

        $data = array_map(function($groupInstance) {
            return [
                'id' => $groupInstance->getId(),
                'status' => $groupInstance->getStatus(),
                'type' => $groupInstance->getType()
            ];
    }, $groupInstances);

        return new JsonResponse([
            'data' => $data,
            'status' => 200
        ]);
    }

    public function findGroupInstanceById(int $id): JsonResponse
    {
        $groupInstance = $this->groupInstanceRepository->find($id);

        if ($groupInstance -> isEmpty()){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No group instances found'
                ]
            ],204);
        }

        return new JsonResponse([
            'data' => $groupInstance,
            'status' => 200
        ]);
    }
}