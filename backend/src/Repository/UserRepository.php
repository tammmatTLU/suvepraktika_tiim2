<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findAllWithoutPwd()
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT id, name FROM user';

        $result = $conn->executeQuery($sql);

        return $result->fetchAllAssociative();
    }

    public function findWithoutPwd(int $id)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT id, name FROM user WHERE id = :id';

        $result = $conn->executeQuery($sql, ['id' => $id]);

        return $result->fetchAllAssociative();
    }

    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
        UPDATE user
        SET pwd_hash = :hashedPassword
        WHERE id = :id
        ';

        $conn->executeQuery($sql, [
            'id' => $user->getId(),
            'hashedPassword' => $newHashedPassword
        ]);
    }
}
