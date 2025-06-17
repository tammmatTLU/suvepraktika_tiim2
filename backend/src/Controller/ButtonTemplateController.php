<?php

namespace App\Controller;

use App\Entity\ButtonTemplate;
use App\Repository\ButtonTemplateRepository;
use App\Repository\RoomRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

final class ButtonTemplateController extends AbstractController
{
    private ButtonTemplateRepository $buttonTemplateRepository;
    private RoomRepository $roomRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(ButtonTemplateRepository $buttonTemplateRepository, RoomRepository $roomRepository, EntityManagerInterface $entityManager)
    {
        $this->buttonTemplateRepository = $buttonTemplateRepository;
        $this->roomRepository = $roomRepository;
        $this->entityManager = $entityManager;
    }

    public function findAllButtonTemplates(): JsonResponse
    {
        $buttonTemplates = $this->buttonTemplateRepository->findAll();

        if(empty($buttonTemplates)){
            return new JsonResponse ([
                'error' =>[
                    'message' => 'No button templates found'
                ]
            ],204);
        }

        $data = array_map(function($buttonTemplate) {
            return $buttonTemplate->serialize();
        }, $buttonTemplates);

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }

    public function findButtonTemplateById(int $id): JsonResponse
    {
        $buttonTemplate = $this->buttonTemplateRepository->find($id);

        if(!$buttonTemplate){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button template found'
                ]
            ],204);
        }

        $data = $buttonTemplate->serialize();

        return new JsonResponse([
            'data' => $data,
        ],200);
    }

    public function createButtonTemplate(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $room = $this->roomRepository->find($data['room_id']);
        
        if (empty($data['name']) || empty($data['command']) || empty($data['room_id'])) {
            return new JsonResponse([
                'error' => [
                    'message' => 'Name, command and/or room_id cannot be empty'
                ]
            ], 400);
        }
        $buttonTemplate = new ButtonTemplate();
        $buttonTemplate->setName($data['name']);
        $buttonTemplate->setCommand($data['command']);
        $buttonTemplate->setRoom($room);
        try{
            $this->entityManager->persist($buttonTemplate);
            $this->entityManager->flush();
        } catch(\Exception $e){
            return new JsonResponse ([
                'error'=>[
                    'message' => 'Database error'
                ]
            ],500);
            echo 'error: '. $e->getMessage();
            echo 'Line; '. $e->getLine();
        }
        return new JsonResponse([
            'data' => $buttonTemplate->serialize()
        ], 201);
    }
}
