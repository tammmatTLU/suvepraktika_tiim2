<?php
namespace App\DataFixtures;

use App\Entity\Device;
use App\Entity\Room;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class DeviceFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        $types = ['Lights', 'Screen', 'Projector'];
        
        for ($i = 0; $i < 15; $i++) {
            $device = new Device();
            $device->setStatus($faker->boolean);
            $device->setType($faker->randomElement($types));
            
            $device->setRoomID($this->getReference(
                'room-'.$faker->numberBetween(0, 4), 
                Room::class
            ));
            
            $manager->persist($device);
            $this->addReference("device-$i", $device);
        }
        
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [RoomFixtures::class];
    }
}