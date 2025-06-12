<?php
namespace App\DataFixtures;

use App\Entity\ButtonInstance;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;


class ButtonInstanceFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies() : array
    {
        return [UserFixtures::class, ButtonTemplateFixtures::class];
    }

    public function load(ObjectManager $manager) : void
    {
        $faker = Factory::create();
        
        for ($i = 0; $i < 30; $i++) {
            $instance = new ButtonInstance();
            $instance->setReduxState(['state' => $faker->word]);
            $instance->setUser($this->getReference('user-'.$faker->numberBetween(1, 10)));
            $instance->setButtonTemplate($this->getReference('template-'.$faker->numberBetween(0, 19)));
            $manager->persist($instance);
        }
        
        $manager->flush();
    }
}