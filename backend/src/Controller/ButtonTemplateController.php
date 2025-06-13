<?php

namespace App\Controller;

use App\Entity\ButtonTemplate;
use App\Repository\ButtonTemplateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

final class ButtonTemplateController extends AbstractController
{
    private ButtonTemplateRepository $buttonTemplateRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(ButtonTemplateRepository $buttonTemplateRepository, EntityManagerInterface $entityManager)
    {
        $this->buttonTemplateRepository = $buttonTemplateRepository;
        $this->entityManager = $entityManager;
    }

    public function findAllButtonTemplates(): JsonResponse
    {
        $buttonTemplates = $this->buttonTemplateRepository->findAll();
        return new JsonResponse([
            'data' => $buttonTemplates,
            'status' => 200
        ]);
    }

    public function findButtonTemplateById(ButtonTemplate $buttonTemplate): JsonResponse
    {
        return new JsonResponse([
            'data' => $buttonTemplate,
            'status' => 200
        ]);
    }

    public function createButtonTemplate(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['name']) ) {
            return new JsonResponse(['error' => 'Missing name'], 400);
        }
        $buttonTemplate = new ButtonTemplate();
        $buttonTemplate->setName($data['name']);
        $this->entityManager->persist($buttonTemplate);
        $this->entityManager->flush();
        return new JsonResponse([
            'data' => [
                'id' => $buttonTemplate->getId(),
                'name' => $buttonTemplate->getName(),
            ],
        ], 201);
    }
}
