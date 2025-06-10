<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RoomController extends AbstractController
{
    private RoomRepository $roomRepository;

    public function __construct(RoomRepository $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    #[Route('/rooms', name: 'app_rooms', methods: ['GET'])]
    public function findAllRooms(): Response
    {
        $rooms = $this->roomRepository->findAll();
        
        return new JsonResponse([
            'data' => $rooms,
            'status' => 'success'
        ]);
    }
}