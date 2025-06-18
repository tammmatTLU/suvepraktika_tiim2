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
            $buttonsPerRoom = $faker->numberBetween(4, 8); // 4-8 buttons per room
            
            for ($buttonIndex = 0; $buttonIndex < $buttonsPerRoom; $buttonIndex++) {
                $config = self::BUTTON_CONFIGS[$buttonIndex % count(self::BUTTON_CONFIGS)];
                
                $button = $this->createButtonTemplate(
                    $config['name'],
                    $config['command'],
                    $room
                );
                
                // Add reference for potential use in other fixtures
                $this->addReference("template-$globalIndex", $button);
                $globalIndex++;
                $manager->persist($button);
            }
        }

        $manager->flush();
    }

    private function createButtonTemplate(string $name, string $command, Room $room): ButtonTemplate
    {
        $button = new ButtonTemplate();
        $button->setName($name);
        $button->setCommand($command);
        $button->setRoom($room);
        
        return $button;
    }
}