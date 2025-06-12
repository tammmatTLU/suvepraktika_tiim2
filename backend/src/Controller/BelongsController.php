<?php

namespace App\Controller;

use App\Repository\BelongsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class BelongsController extends AbstractController
{
    private BelongsRepository $belongsRepository;

    public function __construct(BelongsRepository $belongsRepository)
    {
        $this->belongsRepository = $belongsRepository;
    }

    public function findAllBelongs(): JsonResponse
    {
        $belongs = $this->belongsRepository->findAll();

        return new JsonResponse([
            'data' => $belongs,
            'status' => 200
        ]);
    }
}
