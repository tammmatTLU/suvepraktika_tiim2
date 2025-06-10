<?php

namespace App\Controller;

use App\Repository\GroupInstanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class GroupInstanceController extends AbstractController
{
    private GroupInstanceRepository $groupInstanceRepository;

    public function __construct(GroupInstanceRepository $groupInstanceRepository)
    {
        $this->groupInstanceRepository = $groupInstanceRepository;
    }

    public function findAllGroupInstances(): Response
    {
        $groupinstances = $this->groupInstanceRepository->findAll();
        
        return new JsonResponse([
            'data' => $groupinstances,
            'status' => 'success'
        ]);
    }
}