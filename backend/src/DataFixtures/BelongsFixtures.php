<?php
namespace App\DataFixtures;

use App\Entity\Belongs;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\ButtonGroup;
use App\Entity\ButtonTemplate;

class BelongsFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies() : array
    {
        return [GroupFixtures::class,
                ButtonTemplateFixtures::class];
    }

    public function load(ObjectManager $manager) : void
    {
        // All Lights On group (contains 3 light buttons)
        $this->createBelongs($manager, 'Macro-button-0', ['button-room0-0', 'button-room0-1', 'button-room0-2']);
        
        // All Lights Off group
        $this->createBelongs($manager, 'Macro-button-1', ['button-room1-0', 'button-room1-1', 'button-room1-2']);
        
        $manager->flush();
    }

    private function createBelongs(ObjectManager $manager, string $groupRef, array $buttonRefs)
    {
        foreach ($buttonRefs as $buttonRef) {
            $belongs = new Belongs();
            $belongs->setButtonGroup($this->getReference($groupRef, ButtonGroup::class));
            $belongs->setButtonTemplate($this->getReference($buttonRef, ButtonTemplate::class));
            $manager->persist($belongs);
        }
    }
}