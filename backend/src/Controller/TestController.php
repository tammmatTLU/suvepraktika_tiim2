<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\ButtonTemplateRepository;


class TestController extends AbstractController
{
    private ButtonTemplateRepository $buttonTemplateRepository;

    public function __construct(ButtonTemplateRepository $buttonTemplateRepository)
    {
        $this->buttonTemplateRepository = $buttonTemplateRepository;
    }
    
    public function testPositiveOutput(Request $request): JsonResponse
    {

        $templateId = $request->query->get('templateId');
        if (!$templateId) {
            return new JsonResponse(['error' => 'Missing templateId'], 400);
        }

        $buttonTemplate = $this->buttonTemplateRepository->find($templateId);
        if (!$buttonTemplate) {
            return new JsonResponse(['error' => 'ButtonTemplate not found'], 404);
        }
        
        $command = $buttonTemplate->getCommand();
        $script = dirname(__DIR__) . '/Scripts/Lights.sh';

        if (!file_exists($script)) {
            return new JsonResponse(['error' => 'Script not found', 'path' => $script], 404);
        }

        if (!is_executable($script)) {
            return new JsonResponse(['error' => 'Script not executable', 'path' => $script], 500);
        }

        exec("$script $command 2>&1", $output, $exitCode);

        return new JsonResponse([
            'output' => $output,
            'exitCode' => $exitCode,
        ]);
    }
}
