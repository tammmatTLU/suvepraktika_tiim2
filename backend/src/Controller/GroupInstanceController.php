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
        $groups = $this->groupInstanceRepository->findAll();

        $data = array_map(function($group) {
            return [
                'id' => $group->getId(),
            ];
    }, $groups);

        return $this-> Json([
            'data' => $data,
            'status' => 200
        ]);
    }
}