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

        return new JsonResponse([
            'data' => $devices,
            'status' => 200
        ]);
    }

    public function findDeviceById(int $id): JsonResponse
    {
        $device = $this->deviceRepository->find($id);

        return new JsonResponse([
            'data' => $device,
            'status' => 200
        ]);
    }
}
