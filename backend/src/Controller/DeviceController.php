<?php

namespace App\Controller;

use App\Repository\DeviceRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class DeviceController
{
    private DeviceRepository $deviceRepository;

    public function __construct(DeviceRepository $deviceRepository)
    {
        $this->deviceRepository = $deviceRepository;
    }

    public function index(): Response
    {
        $devices = $this->deviceRepository->findAll();
        
        return new JsonResponse([
            'data' => $devices,
            'status' => 'success'
        ]);
    }
}