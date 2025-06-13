<?php

namespace App\Controller;

use App\Repository\ButtonTemplateRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ButtonTemplateController extends AbstractController
{
    private ButtonTemplateRepository $buttonTemplateRepository;

    public function __construct(ButtonTemplateRepository $buttonTemplateRepository)
    {
        $this->buttonTemplateRepository = $buttonTemplateRepository;
    }

    public function findAllButtonTemplates(): JsonResponse
    {
        $buttonTemplates = $this->buttonTemplateRepository->findAll();
        $data = array_map(function($buttonTemplate) {
            return [
                'id' => $buttonTemplate->getId(),
                'status' => $buttonTemplate->getStatus(),
                'type' => $buttonTemplate->getType()
            ];
    }, $buttonTemplates);

        return new JsonResponse([
            'data' => $data,
            'status' => 200
        ]);
    }

    public function findButtonTemplateById(int $id): JsonResponse
    {
        $buttonTemplate = $this->buttonTemplateRepository->find($id);

        return new JsonResponse([
            'data' => $buttonTemplate,
            'status' => 200
        ]);
    }
}