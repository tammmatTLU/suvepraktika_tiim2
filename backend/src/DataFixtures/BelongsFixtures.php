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
        $this->createBelongs($manager, 'Macro-button-0', ['template-1', 'template-2', 'template-3']);
        
        // All Lights Off group
        $this->createBelongs($manager, 'Macro-button-1', ['template-6', 'template-7', 'template-8']);
        
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