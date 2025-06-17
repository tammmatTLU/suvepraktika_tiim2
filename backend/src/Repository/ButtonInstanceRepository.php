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


    public function findOneByReduxStateId(int $reduxStateId, int $userId): ?ButtonInstance
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT * FROM button_instance
            WHERE user_id = :userId
            AND JSON_EXTRACT(redux_state, "$.id") = :reduxStateId
            LIMIT 1
        ';

        $result = $conn->executeQuery($sql, [
            'userId' => $userId,
            'reduxStateId' => $reduxStateId,
        ]);

        $data = $result->fetchAssociative();

        if (!$data) {
            return null;
        }

        return $this->find($data['id']);
    }

    public function deleteByReduxStateId(int $reduxStateId, int $userId): void
    {
        $buttonInstance = $this->findOneByReduxStateId($reduxStateId, $userId);
        if ($buttonInstance) {
            $entityManager = $this->getEntityManager();
            $entityManager->remove($buttonInstance);
            $entityManager->flush();
        }
    }

    public function updateReduxStateByReduxStateId(int $id, array $newReduxState, int $userId): void
    {
        $buttonInstance = $this->find($id);
        if ($buttonInstance) {
            $buttonInstance->setReduxState($newReduxState);
            $entityManager = $this->getEntityManager();
            $entityManager->flush();
        }
    }
    public function deleteById(int $id): void
    {
        $buttonInstance = $this->find($id);
            if ($buttonInstance) {
                $entityManager = $this->getEntityManager();
                $entityManager->remove($buttonInstance);
                $entityManager->flush();
            }
    }
    
}
