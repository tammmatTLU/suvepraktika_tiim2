<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ButtonInstanceRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
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
                    'message' => 'no user found'
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
                    'message' => 'No user found'
                ]
            ], 204);
        }

        $buttonInstances = $this->buttonInstanceRepository->findButtonInstancesByUserId($user->getId());

        if(empty($buttonInstances)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button-instances found'
                ]
            ],204);
        }

        $data = [];
        foreach ($buttonInstances as $buttonInstance) {
            $data[] = $buttonInstance->serialize();
        }

        return new JsonResponse([
            'data' => $data
        ],200);
    }

    public function findReduxSpanByUserName(string $userName) : JsonResponse
    {
        $user = $this->userRepository->findOneBy(['name' => $userName]);


        $data = [
                'id'=>$user -> getId(),
                'reduxSpan' => $user -> getReduxSpan()
            ];

        return new JsonResponse([
            'data' => $data
        ],200);
    }

    public function addReduxSpan(Request $request, EntityManagerInterFace $entityManager) : JsonResponse
    {
        $data = json_decode($request -> getContent(), true);
        if (empty($data['reduxSpan'])) {
            return new JsonResponse([
                'error' => [
                    'message' => 'Redux span cannot be empty'
                ]
            ], 400);
        }
        if (empty($data['userId'])) {
            return new JsonResponse([
                'error' => ['message' => 'User ID is required']
            ], 400);
        }

        $user = $userRepository->find($data['userId']);

        if (!$user) {
            return new JsonResponse([
                'error' => ['message' => 'User not found']
            ], 404);
        }
        $user->setReduxSpan($data['reduxSpan']);
        try{
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }catch(\Exception $e){
            return new JsonResponse ([
                'error'=>[
                    'message' => 'Database error'
                ]
            ],500);
            echo 'error: '. $e->getMessage();
            echo 'Line; '. $e->getLine();
        }
        return new JsonResponse(['message' => 'Redux span added successfully'],201);

    }
}
