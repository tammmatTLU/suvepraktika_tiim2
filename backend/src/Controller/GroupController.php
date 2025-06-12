<?php

namespace App\Controller;

use App\Repository\GroupRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class GroupController extends AbstractController
{
    private GroupRepository $groupRepository;

    public function __construct(GroupRepository $groupRepository)
    {
        $this->groupRepository = $groupRepository;
    }

    public function findAllGroups(): JsonResponse
    {
        $groups = $this->groupRepository->findAll();

        return new JsonResponse([
            'data' => $groups,
            'status' => 200
        ]);
    }

    public function findGroupById(int $id): JsonResponse
    {
        $group = $this->groupRepository->find($id);

        return new JsonResponse([
            'data' => $group,
            'status' => 200
        ]);
    }
}
