<?php
namespace App\DataFixtures;

use App\Entity\Room;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class RoomFixtures extends Fixture
{
    public function load(ObjectManager $manager) : void
    {
        $rooms = ['A-001', 'A-002', 'A-003', 'A-004', 'A-005'];
        
        foreach ($rooms as $index => $name) {
            $room = new Room();
            $room->setName($name);
            $manager->persist($room);
            $this->addReference("room-$index", $room);
        }
        
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            RoomFixtures::class,
        ];
    }
}