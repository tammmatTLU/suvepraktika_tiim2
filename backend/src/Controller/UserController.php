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
    private EntityManagerInterface $entityManager;

    public function __construct(UserRepository $userRepository, ButtonInstanceRepository $buttonInstanceRepository, EntityManagerInterface $entityManager)
    {
        $this->userRepository = $userRepository;
        $this->buttonInstanceRepository = $buttonInstanceRepository;
        $this->entityManager = $entityManager;
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
            $data[] = $buttonInstance;
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

    public function addReduxSpan(Request $request, EntityManagerInterFace $entityManager, string $userName) : JsonResponse
    {

        $payload = json_decode($request->getContent(), true);

        $user = $payload['userName'] ?? null;
        $data = $payload['spans'] ?? null;


/*         if (empty($payLoad['spans'])) {
            return new JsonResponse([
                'error' => [
                    'message' => 'Redux span cannot be empty'
                ]
            ], 400);
        } */
/*         if (empty($data['userName'])) {
            return new JsonResponse([
                'error' => ['message' => 'User ID is required']
            ], 400);
        } */

        $user = $this->userRepository->findOneBy(['name' => $userName]);

        if (!$user) {
            return new JsonResponse([
                'error' => ['message' => 'User not found']
            ], 404);
        }

        try{
            $user->setReduxSpan($data);
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }catch(\Exception $e){
            return new JsonResponse ([
                'error'=>[
                    'message' => 'Database error',
                    'details' => $e->getMessage(),
                    'line' => $e->getLine()
                ]
            ],500);
            echo 'error: '. $e->getMessage();
            echo 'Line; '. $e->getLine();
        }
        return new JsonResponse(['message' => 'Redux span added successfully'],201);

    }
}
