<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TestController
{
    public function test(): JsonResponse
    {
        $script = dirname(__DIR__, 2) . '/scripts/lights.sh';

        if (!file_exists($script)) {
            return new JsonResponse(['error' => 'Script not found'], 404);
        }

        if (!is_executable($script)) {
            return new JsonResponse(['error' => 'Script not executable'], 500);
        }

        exec($script . ' 2>&1', $output, $exitCode);

        return new JsonResponse([
            'output' => $output,
            'exitCode' => $exitCode,
        ]);
    }
}
