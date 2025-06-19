<?php

namespace App\Controller;

use App\Entity\Token;
use App\Entity\User;
use App\Repository\TokenRepository;
use App\Repository\UserRepository;
use App\Service\TokenService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class AuthenticationController extends AbstractController
{
    private TokenRepository $tokenRepository;
    private UserRepository $userRepository;

    public function __construct(TokenRepository $tokenRepository, UserRepository $userRepository)
    {
        $this->tokenRepository = $tokenRepository;
        $this->userRepository = $userRepository;
    }

    public function register(
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager,
        Request $request
    ): JsonResponse
    {
        $username = $request->getPayload()->getString('username');
        $password = $request->getPayload()->getString('password');
        $passwordAgain = $request->getPayload()->getString('passwordAgain');

        if (!trim($username) || !trim($password) || !trim($passwordAgain)) {
            return new JsonResponse([
                'data' => 'Invalid credentials'
            ], Response::HTTP_BAD_REQUEST);
        }

        if ($password !== $passwordAgain) {
            return new JsonResponse([
                'data' => 'Invalid credentials'
            ], Response::HTTP_BAD_REQUEST);
        }

        $dbUser = $this->userRepository->findOneBy(['name' => $username]);
        if ($dbUser !== null) {
            return new JsonResponse([
                'data' => 'User with inserted username already exists'
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $user = new User();

        $hashedPass = $passwordHasher->hashPassword(
            $user,
            $password
        );

        if ($hashedPass === null) {
            return new JsonResponse([
                'data' => 'Error hashing password'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $user->setName($username);
        $user->setPwdHash($hashedPass);

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'data' => 'User registered successfully'
        ], Response::HTTP_CREATED);
    }

    public function login(
        #[CurrentUser] ?User $user,
        EntityManagerInterface $entityManager,
        Request $request
    ): JsonResponse
    {
        if ($user === null) {
            return new JsonResponse([
                'data' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $tokenService = new TokenService($this->tokenRepository);
        $userToken = $request->getPayload()->getString('userToken');
        $isVerified = $tokenService->verify($user, $userToken);

        if (!trim($userToken) | !$isVerified) {
            $tokenService = new TokenService($this->tokenRepository);
            $generatedToken = $tokenService->generate();

            if ($generatedToken === null) {
                return new JsonResponse([
                    'data' => 'Error generating token'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $token = new Token();
            $token->setUser($user);
            $token->setValue($generatedToken);

            $entityManager->persist($token);
            $entityManager->flush();

            return new JsonResponse([
                'username' => $user->getUserIdentifier(),
                'token' => $token->getValue()
            ], Response::HTTP_OK);
        }

        return new JsonResponse([
            'username' => $user->getUserIdentifier(),
            'token' => $userToken
        ], Response::HTTP_OK);
    }

    public function logout(
        Security $security,
        EntityManagerInterface $entityManager,
        Request $request
    ): JsonResponse
    {
        $token = $this->tokenRepository->findOneBy(
            ['value' => $request->getPayload()->getString('userToken')]
        );

        if (!$token) {
            return new JsonResponse([
                'data' => 'Sent token was invalid'
            ], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->remove($token);
        $entityManager->flush();

        $security->logout(false);

        return new JsonResponse([
            'data' => 'User logged out successfully',
        ], Response::HTTP_OK);
    }

    public function verify(#[CurrentUser] ?User $user, Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED');

        $token = $request->getPayload()->getString('userToken');

        $tokenService = new TokenService($this->tokenRepository);
        $isVerified = $tokenService->verify($user, $token);
        $isAdmin = in_array("ROLE_ADMIN", $user->getRoles());

        if (!$isVerified) {
            return new JsonResponse([
                'data' => 'Token not authentic',
                'token' => $token,
            ], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse([
            'data' => 'Token is authentic',
            'isAdmin' => $isAdmin,
        ], Response::HTTP_OK);
    }
}
