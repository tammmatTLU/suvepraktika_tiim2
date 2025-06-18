<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

class TestController
{
    public function testPositiveOutput(): JsonResponse
    {
        $script = dirname(__DIR__) . '/Scripts/Lights.sh';

        if (!file_exists($script)) {
            return new JsonResponse(['error' => 'Script not found', 'path' => $script], 404);
        }

        if (!is_executable($script)) {
            return new JsonResponse(['error' => 'Script not executable', 'path' => $script], 500);
        }

        exec($script . ' 2>&1', $output, $exitCode);

        return new JsonResponse([
            'output' => $output,
            'exitCode' => $exitCode,
        ]);
    }
}
