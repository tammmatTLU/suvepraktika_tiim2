<?php

namespace App\Controller;

use App\Repository\DeviceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class DeviceController extends AbstractController
{
    private DeviceRepository $deviceRepository;

    public function __construct(DeviceRepository $deviceRepository)
    {
        $this->deviceRepository = $deviceRepository;
    }

    public function findAllDevices(): JsonResponse
    {
        $devices = $this->deviceRepository->findAll();

        if (empty($devices)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No devices found'
                ]
            ],204);
        }

        $data = array_map(function($device) {
            return [
                'id' => $device->getId(),
                'status' => $device->getStatus(),
                'type' => $device->getType()
            ];
    }, $devices);

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }

    public function findDeviceById(int $id): JsonResponse
    {
        $device = $this->deviceRepository->find($id);

        if ($device -> isEmpty()){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No device found'
                ]
            ], 204);
        }

        return new JsonResponse([
            'data' => $device,
            'status' => 200
        ]);
    }

    public function addDevice(): JsonResponse
    {
        
    }
}