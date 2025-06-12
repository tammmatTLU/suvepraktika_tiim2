<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends AbstractController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function findAllUsers(): JsonResponse
    {
        $users = $this->userRepository->findAllWithoutPwd();

        return new JsonResponse([
            'data' => $users,
            'status' => 200
        ]);
    }

    public function findUserById(int $id): JsonResponse
    {
        $user = $this->userRepository->findWithoutPwd($id);

        return new JsonResponse([
            'data' => $user,
            'status' => 200
        ]);
    }
}
