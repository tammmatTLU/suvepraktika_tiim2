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
        $data = array_map(function($device) {
            return [
                'id' => $device->getId(),
                'status' => $device->getStatus(),
                'type' => $device->getType()
            ];
    }, $devices);

        return new JsonResponse([
            'data' => $data,
            'status' => 200
        ]);
    }
}