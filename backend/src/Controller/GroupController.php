<?php

namespace App\Controller;

use App\Repository\GroupRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class GroupController extends AbstractController
{
    private GroupRepository $groupRepository;

    public function __construct(GroupRepository $groupRepository)
    {
        $this->groupRepository = $groupRepository;
    }

    public function index(): Response
    {
        $groups = $this->groupRepository->findAll();
        
        return new JsonResponse([
            'data' => $groups,
            'status' => 'success'
        ]);
    }
}