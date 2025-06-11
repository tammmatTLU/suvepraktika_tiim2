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
    private ?ButtonTemplate $button_template_ID = null;

    #[ORM\ManyToOne(inversedBy: 'belongs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Group $group_ID = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getButtonTemplateID(): ?ButtonTemplate
    {
        return $this->button_template_ID;
    }

    public function setButtonTemplateID(?ButtonTemplate $button_template_ID): self
    {
        $this->button_template_ID = $button_template_ID;

        return $this;
    }

    public function getGroupID(): ?Group
    {
        return $this->group_ID;
    }

    public function setGroupID(?Group $group_ID): self
    {
        $this->group_ID = $group_ID;

        return $this;
    }
}
