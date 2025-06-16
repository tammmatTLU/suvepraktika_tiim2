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
        $data = array_map(function($template) {
            return [
                'id' => $template->getId(),
                'name' => $template->getName(),
                'command' => $template->getCommand(),
            ];
        }, $buttonTemplates);

        return new JsonResponse([
            'data' => $data,
            'status' => 200
        ]);
    }

    public function findButtonTemplateById(int $id): JsonResponse
    {
        return new JsonResponse([
            'data' => $buttonTemplate,
            'status' => 200
        ]);
    }

    public function createButtonTemplate(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['name']) || !isset($data['command'])) {
            return new JsonResponse(['error' => 'ERROR_MISSING_NAME_OR_COMMAND'], 400);
        }
        $buttonTemplate = new ButtonTemplate();
        $buttonTemplate->setName($data['name']);
        $buttonTemplate->setCommand($data['command']);
        $this->entityManager->persist($buttonTemplate);
        $this->entityManager->flush();
        return new JsonResponse([
            'data' => [
                'id' => $buttonTemplate->getId(),
                'name' => $buttonTemplate->getName(),
                'command' => $buttonTemplate->getCommand()
            ],
        ], 201);
    }
}
