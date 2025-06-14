<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ButtonInstanceRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
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

        if (!$users){
            return new JsonResponse (['status' => 'no users found' ], 404);
        }

        return new JsonResponse([
            'data' => $users,
            'status' => 200
        ]);
    }

    public function findUserById(User $user): JsonResponse
    {
        if (!$user){
            return new JsonResponse (['status' => 'user not found' ], 404);
        }

        return new JsonResponse([
            'data' => (object)$user,
            'status' => 200
        ]);
    }

    public function findButtonInstancesByUserName(string $userName): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['name' => $userName]);

        if (!$user){
            return new JsonResponse (['status' => 'No user by that name found'], 404);
        }

        $buttonInstances = $this->buttonInstanceRepository->findButtonInstancesByUserId($user->getId());

        if(!$buttonInstances){
            
        }

        return new JsonResponse([
            'data' => $buttonInstances,
            'status' => 200
        ]);
    }
}
