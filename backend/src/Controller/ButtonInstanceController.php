<?php

namespace App\Controller;

use App\Entity\ButtonInstance;
use App\Repository\ButtonInstanceRepository;
use App\Repository\UserRepository;
use App\Repository\ButtonTemplateRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;

final class ButtonInstanceController extends AbstractController
{
    private ButtonInstanceRepository $buttonInstanceRepository;

    public function __construct(ButtonInstanceRepository $buttonInstanceRepository)
    {
        $this->buttonInstanceRepository = $buttonInstanceRepository;
    }

    public function findAllButtonInstances(): JsonResponse
    {
        $buttonInstances = $this->buttonInstanceRepository->findAll();

        if (empty($buttonInstances)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button instances found'
                ]
            ],204);
        }

        $data = array_map(function($buttonInstance) {
            return $buttonInstance->serialize();
        }, $buttonInstances);

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }

    public function findButtonInstanceById(int $id): JsonResponse
    {
        $buttonInstance = $this->buttonInstanceRepository->find($id);
        
        if (!$buttonInstance){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button instance found'
                ]
            ],204);
        }

        $data = $buttonInstance->serialize();

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }

    public function addButtonInstance(Request $request, UserRepository $userRepository, ButtonTemplateRepository $buttonTemplateRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (empty($data['redux_state'])) {
            return new JsonResponse([
                'error' => [
                    'message' => 'redux_state cannot be empty'
                ]
            ], 400);
        }

        if (empty($data['user_id'])) {
            return new JsonResponse([
                'error' => [
                    'message' => 'user_id is required'
                ]
            ], 400);
        }
        if (empty($data['button_template_id'])) {
            return new JsonResponse([
                'error' => [
                    'message' => 'button_template_id is required'
                ]
            ], 400);
        }

        $user = $userRepository->find($data['user_id']);
        
        if (!$user) {
            return new JsonResponse([
                'error' => [
                    'message' => 'User not found'
                ]
            ], 404);
        }

        $buttonTemplate = $buttonTemplateRepository->find($data['button_template_id']);
        if (!$buttonTemplate) {
            return new JsonResponse([
                'error' => [
                    'message' => 'Button template not found'
                ]
            ], 404);
        }

        $buttonInstance = new ButtonInstance();
        $buttonInstance->setReduxState($data['redux_state']);
        $buttonInstance->setUser($user);
        $buttonInstance->setButtonTemplate($buttonTemplate);

        try {
            $entityManager->persist($buttonInstance);
            $entityManager->flush();
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => [
                    'message' => 'Database error'
                ]
            ], 500);
        }

        return new JsonResponse(['message' => 'Button instance added successfully'], 201);
    }
}
