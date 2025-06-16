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

        if (empty($users)){
            return new JsonResponse ([
                'error' =>[
                    'message' => 'No users found',
                ]
            ], 204);
        }

        return new JsonResponse([
            'data' => $users,
        ],200);
    }

    public function findUserById(User $user): JsonResponse
    {
        if (empty($user)){
            return new JsonResponse ([
                'error' =>[
                    'message' => 'no user found',
                ]
            ], 204);
        }

        return new JsonResponse([
            'data' => (object)$user,
        ],200);
    }

    public function findButtonInstancesByUserName(string $userName): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['name' => $userName]);

        if (!$user){
            return new JsonResponse ([
                'error' =>[
                    'message' => 'No user found',
                ]
            ], 204);
        }

        $buttonInstances = $this->buttonInstanceRepository->findButtonInstancesByUserId($user->getId());

        if(empty($buttonInstances)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button-instances found',
                ]
            ],204);
        }

        $data = [];
        foreach ($buttonInstances as $buttonInstance) {
            $data[] = $buttonInstance->serialize();
        }

        return new JsonResponse([
            'data' => $data,
        ],200);
    }
}
