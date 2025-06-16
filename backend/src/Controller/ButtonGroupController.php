<?php

namespace App\Controller;

use App\Repository\ButtonGroupRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ButtonGroupController extends AbstractController
{
    private ButtonGroupRepository $buttonGroupRepository;

    public function __construct(ButtonGroupRepository $buttonGroupRepository)
    {
        $this->buttonGroupRepository = $buttonGroupRepository;
    }

    public function findAllButtonGroups(): JsonResponse
    {
        $buttonGroups = $this->buttonGroupRepository->findAll();

        if (empty($buttonGroups)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button groups found'
                ]
            ],204);
        }

        $data = array_map(function($buttonGroup) {
            return $buttonGroup->serialize();
        }, $buttonGroups);

        return new JsonResponse([
            'data' => $data,
        ],200);
    }

    public function findButtonGroupById(int $id): JsonResponse
    {
        $buttonGroup = $this->buttonGroupRepository->find($id);

        if(!$buttonGroup){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button group found'
                ]
            ],204);
        }

        $data = $buttonGroup->serialize();

        return new JsonResponse([
            'data' => $data,
        ], 200);
    }
}