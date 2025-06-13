<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

final class RoomController extends AbstractController
{
    private RoomRepository $roomRepository;

    public function __construct(RoomRepository $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    public function findAllRooms(): JsonResponse
    {
        $rooms = $this->roomRepository->findAll();

        return new JsonResponse([
            'data' => $rooms,
            'status' => 200
        ]);
    }

    public function getDevicesByRoom(int $id): JsonResponse
    {
        $room = $this->roomRepository->find($id);

        if (!$room) {
            return new JsonResponse(['error' => 'Room not found'], 404);
        }

        $devices = $room->getDevices();

        if ($devices -> isEmpty()){
            return new JsonResponse(['message' => 'No devices in room']);
        }

        $data = [];
        foreach ($devices as $device) {
            $data[] = [
                'id' => $device->getId(),
                'status' => $device->getStatus(),
                'type' => $device->getType()
            ];
        }

        return new JsonResponse([
            'data' => $data,
            'status' => 200
        ]);
    }

    public function findRoomById(int $id): JsonResponse
    {
        $room = $this->roomRepository->find($id);

        return new JsonResponse([
            'data' => $room,
            'status' => 200
        ]);
    }
}
