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

        $data = array_map(function($belong) {
            return [
                'id' => $belong->getId(),
            ];
        }, $belongs);

        return $this-> Json([
            'data' => $data,
            'status' => 200
        ]);
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

        return new JsonResponse([
            'data' => $belongs,
        ],200);
    }
}