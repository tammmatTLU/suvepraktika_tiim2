<?php

namespace App\Repository;

use App\Entity\ButtonInstance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ButtonInstance>
 */
class ButtonInstanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ButtonInstance::class);
    }

    public function findButtonInstancesByUserId(int $userId)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
        SELECT * FROM button_instance
        WHERE user_id = :userId
        ';

        $result = $conn->executeQuery($sql, ['userId' => $userId]);

        return $result->fetchAllAssociative();
    }
}
