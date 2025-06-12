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
        $buttontemplates = $this->buttonTemplateRepository->findAll();

        return new JsonResponse([
            'data' => $buttontemplates,
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
