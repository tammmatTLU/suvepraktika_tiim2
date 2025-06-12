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
        $groupinstances = $this->groupInstanceRepository->findAll();

        return new JsonResponse([
            'data' => $groupinstances,
            'status' => 200
        ]);
    }

    public function findGroupInstanceById(int $id): JsonResponse
    {
        $groupInstance = $this->groupInstanceRepository->find($id);

        return new JsonResponse([
            'data' => $groupInstance,
            'status' => 200
        ]);
    }
}
