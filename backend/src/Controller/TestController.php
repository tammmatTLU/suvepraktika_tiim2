<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\StreamedResponse; // <-- Added for SSE support
use App\Repository\ButtonTemplateRepository;

class TestController extends AbstractController
{
    private ButtonTemplateRepository $buttonTemplateRepository;

    public function __construct(ButtonTemplateRepository $buttonTemplateRepository)
    {
        $this->buttonTemplateRepository = $buttonTemplateRepository;
    }
    
    // Changed return type to allow StreamedResponse as well
    public function testButtons(Request $request)
    {
        $templateId = $request->query->get('templateId');
        if (!$templateId) {
            return new JsonResponse(['error' => 'Missing templateId'], 400);
        }

        $buttonTemplate = $this->buttonTemplateRepository->find($templateId);
        if (!$buttonTemplate) {
            return new JsonResponse(['error' => 'ButtonTemplate not found'], 404);
        }

        $templateName = strtolower($buttonTemplate->getName());
        if (str_contains($templateName, 'projector')){
            $script = dirname(__DIR__) . '/Scripts/Projector.sh';
            $command = $buttonTemplate->getCommand();

            $response = new StreamedResponse(function () use ($script, $command) {
                if (!file_exists($script)) {
                    echo "data: Script not found\n\n";
                    @ob_flush(); @flush();
                    return;
                }

                if (!is_executable($script)) {
                    echo "data: Script not executable\n\n";
                    @ob_flush(); @flush();
                    return;
                }

                $process = popen("$script $command 2>&1", 'r');
                if (!$process) {
                    echo "data: Could not start script\n\n";
                    @ob_flush(); @flush();
                    return;
                }

                while (!feof($process)) {
                    $line = fgets($process);
                    if ($line !== false) {
                        echo "data: " . trim($line) . "\n\n";
                        @ob_flush(); @flush();
                    }
                }
                pclose($process);

                echo "event: end\ndata: done\n\n";
                @ob_flush(); @flush();
            });

            $response->headers->set('Content-Type', 'text/event-stream');
            $response->headers->set('Cache-Control', 'no-cache');
            $response->headers->set('Connection', 'keep-alive');
            return $response;

        } elseif (str_contains($templateName, 'lights')){
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
        } else {
            return new JsonResponse([
                'output' => ['unknown device']
            ]);
        }
    }
}
