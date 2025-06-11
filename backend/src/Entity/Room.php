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
    #[ORM\OneToMany(targetEntity: Device::class, mappedBy: 'room_ID')]
    private Collection $devices;

    /**
     * @var Collection<int, ButtonTemplate>
     */
    #[ORM\OneToMany(targetEntity: ButtonTemplate::class, mappedBy: 'room_ID')]
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
            $device->setRoomID($this);
        }

        return $this;
    }

    public function removeDevice(Device $device): static
    {
        if ($this->devices->removeElement($device)) {
            if ($device->getRoomID() === $this) {
                $device->setRoomID(null);
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
            $buttonTemplate->setRoomID($this);
        }

        return $this;
    }

    public function removeButtonTemplate(ButtonTemplate $buttonTemplate): static
    {
        if ($this->buttonTemplates->removeElement($buttonTemplate)) {
            // set the owning side to null (unless already changed)
            if ($buttonTemplate->getRoomID() === $this) {
                $buttonTemplate->setRoomID(null);
            }
        }

        return $this;
    }
}
