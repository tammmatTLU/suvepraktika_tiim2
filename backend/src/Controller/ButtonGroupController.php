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

        if (enpty($buttonGroups)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button groups found'
                ]
            ],204);
        }

        $data = array_map(function($buttonGroup) {
            return [
                'id' => $buttonGroup->getId(),
                'status' => $buttonGroup->getStatus(),
                'type' => $buttonGroup->getType()
            ];
    }, $buttonGroups);

        return new JsonResponse([
            'data' => $data,
        ],200);
    }

    public function findButtonGroupById(int $id): JsonResponse
    {
        $buttonGroup = $this->buttonGroupRepository->find($id);

        if(empty($buttonGroup)){
            return new JsonResponse ([
                'error' => [
                    'message' => 'No button group found'
                ]
            ],204);
        }

        return new JsonResponse([
            'data' => $buttonGroup,
        ],200);
    }
}