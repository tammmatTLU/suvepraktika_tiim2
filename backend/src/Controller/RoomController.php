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

        if (empty($rooms)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No rooms found'
                ]
            ],204);
        }

        $data = array_map(function($room) {
            return $room->serialize();
        }, $rooms);

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }

    public function getDevicesByRoom(int $id): JsonResponse
    {
        $room = $this->roomRepository->find($id);

        if (!$room) {
            return new JsonResponse([
                'error' => [
                    'message' => 'room not found',
                ]
            ], 204);
        }

        $devices = $room->getDevices();

        if (empty($devices)) {
            return new JsonResponse([
                'message' => 'No devices in room'
            ]);
        }

        $data = [];
        foreach ($devices as $device) {
            $data[] = $device->serialize();
        }

        return new JsonResponse([
            'data' => $data,
        ],200);
    }

    public function findRoomById(int $id): JsonResponse
    {
        $room = $this->roomRepository->find($id);

        if (!$room){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No room found'
                ]
            ], 204);
        }

        $data = $room->serialize();

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }
}
