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

    public function findAllRooms(): Response
    {
        $rooms = $this->roomRepository->findAll();
        $roomData = array_map(function($room){
            return [
                'id' => $room->getId(),
                'name' => $room->getName()
            ];
        }, $rooms);

        return new JsonResponse([
            'data' => $roomData,
            'status' => 'success'
        ]);
    }
}