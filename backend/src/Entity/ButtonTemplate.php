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

    #[ORM\Column(length: 25)]
    private ?string $name = null;

    /**
     * @var Collection<int, Belongs>
     */
    #[ORM\OneToMany(targetEntity: Belongs::class, mappedBy: 'buttonTemplate')]
    private Collection $belongs;

    /**
     * @var Collection<int, ButtonInstance>
     */
    #[ORM\OneToMany(targetEntity: ButtonInstance::class, mappedBy: 'buttonTemplate')]
    private Collection $buttonInstances;

    #[ORM\ManyToOne(inversedBy: 'buttonTemplates')]
    private ?Room $room = null;

    public function __construct()
    {
        $this->belongs = new ArrayCollection();
        $this->buttonInstances = new ArrayCollection();
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
            $belong->setButtonTemplate($this);
        }

        return $this;
    }

    public function removeBelong(Belongs $belong): static
    {
        if ($this->belongs->removeElement($belong)) {
            // set the owning side to null (unless already changed)
            if ($belong->getButtonTemplate() === $this) {
                $belong->setButtonTemplate(null);
            }
        }

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
            $buttonInstance->setButtonTemplate($this);
        }

        return $this;
    }

    public function removeButtonInstance(ButtonInstance $buttonInstance): static
    {
        if ($this->buttonInstances->removeElement($buttonInstance)) {
            if ($buttonInstance->getButtonTemplate() === $this) {
                $buttonInstance->setButtonTemplate(null);
            }
        }

        return $this;
    }

    public function getRoom(): ?Room
    {
        return $this->room;
    }

    public function setRoom(?Room $room): static
    {
        $this->room = $room;

        return $this;
    }

    public function serialize(): array
    {
        return [
            'id' => $this->getId(),
            'command' => $this->getCommand(),
            'name' => $this->getName(),
            'room_id' => $this->getRoom()?->getId()
        ];
    }
}
