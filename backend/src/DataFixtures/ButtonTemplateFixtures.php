<?php
namespace App\DataFixtures;

use App\Entity\ButtonTemplate;
use App\Entity\Room;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ButtonTemplateFixtures extends Fixture implements DependentFixtureInterface
{
    private const BUTTON_CONFIGS = [
        ['name' => 'Power On lights', 'command' => 'on'],
        ['name' => 'Power Off lights', 'command' => 'off'],
        ['name' => 'Power On projector', 'command' => 'on'],
        ['name' => 'Power Off projector', 'command' => 'off'],

    ];



    public function getDependencies(): array
    {
        return [RoomFixtures::class];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        $globalIndex = 0;
        
        // Create buttons for each room
        for ($roomIndex = 0; $roomIndex < 5; $roomIndex++) {
            $room = $this->getReference('room-'.$roomIndex, Room::class);
            $roomName = $room->getName(); // 4-8 buttons per room
            
            foreach (self::BUTTON_CONFIGS as $config) {
                $button = new ButtonTemplate();
                $button->setName($roomName . ' ' . $config['name']);
                $button->setCommand($config['command']);
                $button->setRoom($room);


                $manager->persist($button);
                $this->addReference("template-$globalIndex", $button);
                $globalIndex++;
            }
        }

        $manager->flush();
    }
}