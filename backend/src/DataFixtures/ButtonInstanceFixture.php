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
        
        for ($i = 0; $i < 30; $i++) {

            $reduxStateObj = (object) array(
                'id' => $faker->numberBetween(1, 100),
                'name' => '',
                'type' => 'button',
                'position' => (object) array(
                    'x' => 100,
                    'y' => 0
                ),
                'state' => $faker->boolean(0.5),
                'size' => (object) array(
                    'width' => $faker->numberBetween(12,20),
                    'height' => $faker->numberBetween(12,20)
                ),
                'fontSize' => $faker->numberBetween(10,20),
                'fontFamily' => 'Arial, Helvetica, sans-serif',
                'color' => $faker->hexColor(),
                'backgroundColor' => $faker->hexColor()
            );
            #echo json_encode($reduxStateObj);

            $instance = new ButtonInstance();
            $instance->setReduxState(['ButtonElement' => $reduxStateObj]);
            $instance->setUser($this->getReference('user-'.$faker->numberBetween(1, 5), User::class));
            $instance->setButtonTemplate($this->getReference('template-'.$faker->numberBetween(0, 19), ButtonTemplate::class));
            $manager->persist($instance);
            #echo "added buttonInstance";
        }

        $manager->flush();
    }
}
