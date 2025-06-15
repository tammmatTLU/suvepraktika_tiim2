<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ButtonInstanceRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

final class UserController extends AbstractController
{
    private UserRepository $userRepository;
    private ButtonInstanceRepository $buttonInstanceRepository;

    public function __construct(UserRepository $userRepository, ButtonInstanceRepository $buttonInstanceRepository)
    {
        $this->userRepository = $userRepository;
        $this->buttonInstanceRepository = $buttonInstanceRepository;
    }

    public function findAllUsers(): JsonResponse
    {
        $users = $this->userRepository->findAllWithoutPwd();

        return new JsonResponse([
            'data' => $users,
            'status' => 200
        ]);
    }

    public function findUserById(User $user): JsonResponse
    {
        return new JsonResponse([
            'data' => (object)$user,
            'status' => 200
        ]);
    }

    public function findButtonInstancesByUserName(string $userName): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['name' => $userName]);
        $buttonInstances = $this->buttonInstanceRepository->findButtonInstancesByUserId($user->getId());

        return new JsonResponse([
            'data' => $buttonInstances,
            'status' => 200
        ]);
    }
}
