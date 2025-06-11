<?php

namespace App\Entity;

use App\Repository\ButtonTemplateRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ButtonTemplateRepository::class)]
class ButtonTemplate
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $command = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    /**
     * @var Collection<int, ButtonInstance>
     */
    #[ORM\OneToMany(targetEntity: ButtonInstance::class, mappedBy: 'button_template_ID')]
    private Collection $buttonInstances;

    /**
     * @var Collection<int, Belongs>
     */
    #[ORM\OneToMany(targetEntity: Belongs::class, mappedBy: 'button_template_ID')]
    private Collection $belongs;

    #[ORM\ManyToOne(inversedBy: 'buttonTemplates')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Room $room_ID = null;

    public function __construct()
    {
        $this->buttonInstances = new ArrayCollection();
        $this->belongs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCommand(): ?string
    {
        return $this->command;
    }

    public function setCommand(string $command): static
    {
        $this->command = $command;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, ButtonInstance>
     */
    public function getButtonInstances(): Collection
    {
        return $this->buttonInstances;
    }

    public function addButtonInstance(ButtonInstance $buttonInstance): static
    {
        if (!$this->buttonInstances->contains($buttonInstance)) {
            $this->buttonInstances->add($buttonInstance);
            $buttonInstance->setButtonTemplateID($this);
        }

        return $this;
    }

    public function removeButtonInstance(ButtonInstance $buttonInstance): static
    {
        if ($this->buttonInstances->removeElement($buttonInstance)) {
            // set the owning side to null (unless already changed)
            if ($buttonInstance->getButtonTemplateID() === $this) {
                $buttonInstance->setButtonTemplateID(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Belongs>
     */
    public function getBelongs(): Collection
    {
        return $this->belongs;
    }

    public function addBelong(Belongs $belong): static
    {
        if (!$this->belongs->contains($belong)) {
            $this->belongs->add($belong);
            $belong->setButtonTemplateID($this);
        }

        return $this;
    }

    public function removeBelong(Belongs $belong): static
    {
        if ($this->belongs->removeElement($belong)) {
            if ($belong->getButtonTemplateID() === $this) {
                $belong->setButtonTemplateID(null);
            }
        }

        return $this;
    }

    public function getRoomID(): ?Room
    {
        return $this->room_ID;
    }

    public function setRoomID(?Room $room_ID): static
    {
        $this->room_ID = $room_ID;

        return $this;
    }
}
