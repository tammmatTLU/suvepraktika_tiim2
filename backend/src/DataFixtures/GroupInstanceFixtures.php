<?php
namespace App\DataFixtures;

use App\Entity\GroupInstance;
use App\Entity\User;
use App\Entity\Group;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class GroupInstanceFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        //$this->verifyReferencesExist();
        
        // Create 2 macro button instances for each user
        for ($userNum = 1; $userNum <= 5; $userNum++) {
            for ($i = 0; $i < 2; $i++) {
                $instance = new GroupInstance();
                $instance->setReduxState(['active' => false]);
                
                $macroButtonIndex = $faker->numberBetween(0, 4);
                $instance->setUserID($this->getReference("user-$userNum", User::class));
                $instance->setGroupID($this->getReference(
                    "Macro-button-".$faker->numberBetween(0, 1),
                    Group::class
                ));
                
                $manager->persist($instance);
            }
        }
        
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [UserFixtures::class, GroupFixtures::class];
    }
}