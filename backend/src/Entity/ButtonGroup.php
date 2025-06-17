<?php

namespace App\Entity;

use App\Repository\ButtonGroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ButtonGroupRepository::class)]
class ButtonGroup
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 25)]
    private ?string $name = null;

    /**
     * @var Collection<int, GroupInstance>
     */
    #[ORM\OneToMany(targetEntity: GroupInstance::class, mappedBy: 'buttonGroup')]
    private Collection $groupInstance;

    /**
     * @var Collection<int, Belongs>
     */
    #[ORM\OneToMany(targetEntity: Belongs::class, mappedBy: 'buttonGroup')]
    private Collection $belongs;

    public function __construct()
    {
        $this->groupInstance = new ArrayCollection();
        $this->belongs = new ArrayCollection();
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
     * @return Collection<int, GroupInstance>
     */
    public function getGroupInstance(): Collection
    {
        return $this->groupInstance;
    }

    public function addGroupInstance(GroupInstance $groupInstance): static
    {
        if (!$this->groupInstance->contains($groupInstance)) {
            $this->groupInstance->add($groupInstance);
            $groupInstance->setButtonGroup($this);
        }

        return $this;
    }

    public function removeGroupInstance(GroupInstance $groupInstance): static
    {
        if ($this->groupInstance->removeElement($groupInstance)) {
            if ($groupInstance->getButtonGroup() === $this) {
                $groupInstance->setButtonGroup(null);
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
            $belong->setButtonGroup($this);
        }

        return $this;
    }

    public function removeBelong(Belongs $belong): static
    {
        if ($this->belongs->removeElement($belong)) {
            if ($belong->getButtonGroup() === $this) {
                $belong->setButtonGroup(null);
            }
        }

        return $this;
    }

    public function serialize(): array
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
        ];
    }
}
