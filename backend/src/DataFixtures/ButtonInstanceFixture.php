<?php
namespace App\DataFixtures;

use App\Entity\ButtonInstance;
use App\Entity\ButtonTemplate;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;


class ButtonInstanceFixture extends Fixture implements DependentFixtureInterface
{
    public function getDependencies() : array
    {
        return [UserFixtures::class, ButtonTemplateFixtures::class];
    }

    public function load(ObjectManager $manager) : void
    {
        $faker = Factory::create();

        $reduxStateObj = (object) array(
            $faker->word => $faker -> word,
            $faker->word => (object) array(
                $faker->word => $faker -> word,
                $faker->word => $faker -> word,
            ),
            $faker->word => $faker -> word,
            $faker->word => $faker -> word,
        );

        echo json_encode($reduxStateObj);
        
        for ($i = 0; $i < 30; $i++) {
            $instance = new ButtonInstance();
            $instance->setReduxState(['state' => $reduxStateObj]);
            $instance->setUser($this->getReference('user-'.$faker->numberBetween(1, 5), User::class));
            $instance->setButtonTemplate($this->getReference('template-'.$faker->numberBetween(0, 19), ButtonTemplate::class));
            $manager->persist($instance);
            #echo "added buttonInstance";
        }
        
        $manager->flush();
    }
}