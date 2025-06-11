<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function findAllUsers(): Response
    {
        $users = $this->userRepository->findAll();
        $userData = array_map(function($user) {
            return [
                'id' => $user->getId(),
                'name' => $user->getUserName()
        ];
    }, $users);

        return new JsonResponse([
            'data' => $userData,
            'status' => 'success'
    ]);
    }
}