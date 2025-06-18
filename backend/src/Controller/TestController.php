<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\ButtonTemplateRepository;
use Doctrine\Migrations\Configuration\Migration\JsonFile;

class TestController extends AbstractController
{
    private ButtonTemplateRepository $buttonTemplateRepository;

    public function __construct(ButtonTemplateRepository $buttonTemplateRepository)
    {
        $this->buttonTemplateRepository = $buttonTemplateRepository;
    }
    
    public function testButtons(Request $request): JsonResponse
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

            $response = new StreamedResponse(function () use ($script, $command){
                
            })

            if (!file_exists($script)) {
                header('Content-Type: text/event-stream');
                echo "data: Script not found\n\n";
                @ob_flush(); @flush();
                exit();
            }

            if (!is_executable($script)) {
                header('Content-Type: text/event-stream');
                echo "data: Script not executable\n\n";
                @ob_flush(); @flush();
                exit();
            }

            header('Content-Type: text/event-stream');
            header('Cache-Control: no-cache');
            header('Connection: keep-alive');

            $process = popen("$script $command 2>&1", 'r');
            if (!$process) {
                echo "data: Could not start script\n\n";
                @ob_flush(); @flush();
                exit();
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
            exit();

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
            return new Jsonresponse ([
                'output' => ['unknown device']
            ]);
        }
    }
}
