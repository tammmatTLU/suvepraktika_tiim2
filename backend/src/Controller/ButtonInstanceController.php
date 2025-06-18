<?php

namespace App\Controller;

use App\Entity\ButtonInstance;
use App\Repository\ButtonInstanceRepository;
use App\Repository\UserRepository;
use App\Repository\ButtonTemplateRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

final class ButtonInstanceController extends AbstractController
{
    private ButtonInstanceRepository $buttonInstanceRepository;
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;
    private ButtonTemplateRepository $buttonTemplateRepository;


    public function __construct(ButtonInstanceRepository $buttonInstanceRepository, UserRepository $userRepository, ButtonTemplateRepository $buttonTemplateRepository, EntityManagerInterface $entityManager)
    {
        $this->buttonInstanceRepository = $buttonInstanceRepository;
        $this->userRepository = $userRepository;
        $this->buttonTemplateRepository = $buttonTemplateRepository;
        $this->entityManager = $entityManager;
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

    public function saveButtonInstance(Request $request)
    {
        $added = 0;
        $updated = 0;
        $deleted = 0;

        $data = json_decode($request->getContent(), true);
        $payloadReduxData = $data['buttons'] ?? [];
        $payloadUserData = $data['user_name'] ?? null;

        error_log('Raw request: ' . $request->getContent());
        error_log('Decoded data: ' . print_r($data, true));


        if (!$payloadUserData) {
            return new JsonResponse([
                'error' => [
                    'message' => 'user_name is required'
                ]
            ], 400);
        }

        $user = $this->userRepository->findOneBy(['name' => $payloadUserData]);

        if (!$user) {
            return new JsonResponse([
                'error' => [
                    'message' => 'User not found'
                ]
            ], 404);
        }

        $dbButtons = $this->buttonInstanceRepository->findButtonInstancesByUserId($user->getId());
        $dbIds = array_map(fn($b) => $b['id'] ?? null, $dbButtons);
        $dbIds = array_filter($dbIds);

        $sentButtons = $payloadReduxData;
        $sentIds = array_map(fn($b) => $b['id'] ?? null, $sentButtons);
        foreach ($sentButtons as $button) {
            $sentId = $button['id'] ?? null;
            if (!$sentId) continue;

            $reduxState = $button;
            $buttonTemplate = $this->buttonTemplateRepository->find($button['templateId'] ?? null);

            if (!in_array($sentId, $dbIds)) {
                $buttonInstance = new ButtonInstance();
                $buttonInstance->setId($sentId);
                $buttonInstance->setReduxState($reduxState);
                $buttonInstance->setUser($user);
                if ($buttonTemplate) {
                $buttonInstance->setButtonTemplate($buttonTemplate);
                }
                $this->entityManager->persist($buttonInstance);
                $added++;
            } else {
                $dbButton = array_filter($dbButtons, function($b) use ($sentId) {
                    return ($b['id'] ?? null) == $sentId;
                });
                $dbButton = reset($dbButton);
                $dbReduxState = is_string($dbButton['redux_state']) ? json_decode($dbButton['redux_state'], true) : $dbButton['redux_state'];

                if ($dbReduxState != $reduxState) {
                    $this->buttonInstanceRepository->updateReduxStateByReduxStateId($sentId, $reduxState, $user->getId());
                    $updated++;
                }
            }
        }

        foreach ($dbButtons as $dbButton) {
            $dbId = $dbButton['id'] ?? null;
            if ($dbId && !in_array($dbId, $sentIds, true)) {
                $this->buttonInstanceRepository->deleteById($dbId);
                $deleted++;
            }
        }
        $this->entityManager->flush();

        return new JsonResponse([
            'message' => 'Button instances processed successfully',
            'added' => $added,
            'updated' => $updated,
            'deleted' => $deleted,
            "db" => $dbIds,
            "sent" => $sentIds
        ], 200);

    }
}
