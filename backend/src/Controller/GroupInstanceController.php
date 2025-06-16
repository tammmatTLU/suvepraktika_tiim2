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

        if (empty($groupInstances)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No group instances found'
                ]
            ],204);
        }

        $data = array_map(function($groupInstance) {
            return $groupInstance->serialize();
        }, $groupInstances);

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }

    public function findGroupInstanceById(int $id): JsonResponse
    {
        $groupInstance = $this->groupInstanceRepository->find($id);

        if (!$groupInstance){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No group instance found'
                ]
            ], 204);
        }

        $data = $groupInstance->serialize();

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }
}