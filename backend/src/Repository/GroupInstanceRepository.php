<?php

namespace App\Repository;

use App\Entity\GroupInstance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GroupInstance>
 */
class GroupInstanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupInstance::class);
    }

        public function findButtonInstancesByUserId(int $userId)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
        SELECT * FROM group_instance
        WHERE user_id = :userId
        ';

        $result = $conn->executeQuery($sql, ['userId' => $userId]);

        return $result->fetchAllAssociative();
    }
}
