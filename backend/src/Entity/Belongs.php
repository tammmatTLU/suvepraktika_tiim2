<?php

namespace App\Entity;

use App\Repository\BelongsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BelongsRepository::class)]
class Belongs
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'belongs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ButtonTemplate $buttonTemplate = null;

    #[ORM\ManyToOne(inversedBy: 'belongs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ButtonGroup $buttonGroup = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getButtonTemplate(): ?ButtonTemplate
    {
        return $this->buttonTemplate;
    }

    public function setButtonTemplate(?ButtonTemplate $buttonTemplate): static
    {
        $this->buttonTemplate = $buttonTemplate;

        return $this;
    }

    public function getButtonGroup(): ?ButtonGroup
    {
        return $this->buttonGroup;
    }

    public function setButtonGroup(?ButtonGroup $buttonGroup): static
    {
        $this->buttonGroup = $buttonGroup;

        return $this;
    }
}
