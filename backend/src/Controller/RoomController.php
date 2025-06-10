<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RoomController
{
    private RoomRepository $roomRepository;

    public function __construct(RoomRepository $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    public function index(): Response
    {
        $rooms = $this->roomRepository->findAll();
        
        return new JsonResponse([
            'data' => $rooms,
            'status' => 'success'
        ]);
    }
}