<?php
namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;
    
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

        public function getDependencies(): array
    {
        return [
            GroupFixtures::class
        ];
    }
    
    public function load(ObjectManager $manager) : void
    {
        $users = [
            ['user_name' => 'admin', 'role' => 'ROLE_ADMIN'],
            ['user_name' => 'user-1', 'role' => 'ROLE_USER'],
            ['user_name' => 'user-2', 'role' => 'ROLE_USER'],
            ['user_name' => 'user-3', 'role' => 'ROLE_USER'],
            ['user_name' => 'user-4', 'role' => 'ROLE_USER'],
        ];
        
        foreach ($users as $index => $userData) {
            $user = new User();
            $user->setName($userData['user_name']);
            $user->setRole($userData['role']);
            
            // Set password to "root" for all users
            $user->setPwdHash(
                $this->passwordHasher->hashPassword(
                    $user,
                    'root' // Plain password
                )
            );
            
            $manager->persist($user);
            $this->addReference("user-".($index+1), $user);
        }
        
        $manager->flush();
    }
}