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

        if ($users -> isEmpty()){
            return new JsonResponse ([
                'error' =>[
                    'message' => 'no users found',
                ]
            ], 204);
        }

        return new JsonResponse([
            'data' => $users,
            'status' => 200
        ]);
    }

    public function findUserById(User $user): JsonResponse
    {
        if ($user -> isEmpty()){
            return new JsonResponse ([
                'error' =>[
                    'message' => 'no user found',
                ]
            ], 204);
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

        $data = array_map(function($buttonInstance ){
            return [
                'id' => $buttonInstance['id'],
                'reduxState' => $buttonInstance['redux_state'],
                'buttonTemplate_ID' => $buttonInstance['button_template_id']
            ];
        }, $buttonInstances);

        return new JsonResponse([
            'data' => $data,
            'status' => 200
        ]);
    }
}
