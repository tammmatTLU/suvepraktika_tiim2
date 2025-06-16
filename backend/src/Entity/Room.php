<?php

namespace App\Entity;

use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoomRepository::class)]
class Room
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 25)]
    private ?string $name = null;

    /**
     * @var Collection<int, Device>
     */
    #[ORM\OneToMany(targetEntity: Device::class, mappedBy: 'room')]
    private Collection $devices;

    /**
     * @var Collection<int, ButtonTemplate>
     */
    #[ORM\OneToMany(targetEntity: ButtonTemplate::class, mappedBy: 'room')]
    private Collection $buttonTemplates;

    public function __construct()
    {
        $this->devices = new ArrayCollection();
        $this->buttonTemplates = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
     * @return Collection<int, Device>
     */
    public function getDevices(): Collection
    {
        return $this->devices;
    }

    public function addDevice(Device $device): static
    {
        if (!$this->devices->contains($device)) {
            $this->devices->add($device);
            $device->setRoom($this);
        }

        return $this;
    }

    public function removeDevice(Device $device): static
    {
        if ($this->devices->removeElement($device)) {
            // set the owning side to null (unless already changed)
            if ($device->getRoom() === $this) {
                $device->setRoom(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ButtonTemplate>
     */
    public function getButtonTemplates(): Collection
    {
        return $this->buttonTemplates;
    }

    public function addButtonTemplate(ButtonTemplate $buttonTemplate): static
    {
        if (!$this->buttonTemplates->contains($buttonTemplate)) {
            $this->buttonTemplates->add($buttonTemplate);
            $buttonTemplate->setRoom($this);
        }

        return $this;
    }

    public function removeButtonTemplate(ButtonTemplate $buttonTemplate): static
    {
        if ($this->buttonTemplates->removeElement($buttonTemplate)) {
            if ($buttonTemplate->getRoom() === $this) {
                $buttonTemplate->setRoom(null);
            }
        }

        return $this;
    }

    public function serialize(): array
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName()
        ];
    }
}
