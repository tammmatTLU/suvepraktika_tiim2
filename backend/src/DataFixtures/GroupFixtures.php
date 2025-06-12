<?php
namespace App\DataFixtures;

use App\Entity\ButtonGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GroupFixtures extends Fixture
{
    public function load(ObjectManager $manager) : void
    {
        $macroButtons = [
            'All Lights On',
            'All Lights Off'
        ];
        
        for ($i = 0; $i < 2; $i++) {
            $group = new ButtonGroup();
            $group->setName("Macro-button-$i");
            $manager->persist($group);
            $this->addReference("Macro-button-$i", $group);
            echo "Added reference Macro-button-$i\n"; 
        }
        
        $manager->flush();
    }
}