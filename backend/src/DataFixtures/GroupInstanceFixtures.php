<?php
namespace App\DataFixtures;

use App\Entity\GroupInstance;
use App\Entity\User;
use App\Entity\ButtonGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class GroupInstanceFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return [UserFixtures::class, GroupFixtures::class];
    }
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
                $instance->setUser($this->getReference("user-$userNum", User::class));
                $instance->setButtonGroup($this->getReference(
                    "Macro-button-".$faker->numberBetween(0, 1),
                    ButtonGroup::class
                ));
                
                $manager->persist($instance);
            }
        }
        
        $manager->flush();
    }
}