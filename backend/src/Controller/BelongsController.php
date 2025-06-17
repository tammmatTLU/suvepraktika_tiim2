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

        if(empty($belongs)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No data found'
                ]
            ],204);
        }

        $data = array_map(function($belongs) {
            return $belongs->serialize();
        }, $belongs);

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }

    public function findBelongsById(int $id): JsonResponse
    {
        $belongs = $this->belongsRepository->find($id);

        if(!$belongs){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No data found'
                ]
            ],204);
        }

        $data = $belongs->serialize();

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }
}