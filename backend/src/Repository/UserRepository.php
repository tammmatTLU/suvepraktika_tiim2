<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findAllWithoutPwd()
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT id, user_name FROM user';

        $result = $conn->executeQuery($sql);

        return $result->fetchAllAssociative();
    }

    public function findWithoutPwd(int $id)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT id, user_name FROM user WHERE id = :id';

        $result = $conn->executeQuery($sql, ['id' => $id]);

        return $result->fetchAllAssociative();
    }
}
