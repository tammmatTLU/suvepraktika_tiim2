<?php

namespace App\Entity;

use App\Repository\GroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GroupRepository::class)]
#[ORM\Table(name: '`group`')]
class Group
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
    #[ORM\OneToMany(targetEntity: GroupInstance::class, mappedBy: 'group_ID')]
    private Collection $groupInstances;

    /**
     * @var Collection<int, Belongs>
     */
    #[ORM\OneToMany(targetEntity: Belongs::class, mappedBy: 'group_ID')]
    private Collection $belongs;

    public function __construct()
    {
        $this->groupInstances = new ArrayCollection();
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
    public function getGroupInstances(): Collection
    {
        return $this->groupInstances;
    }

    public function addGroupInstance(GroupInstance $groupInstance): static
    {
        if (!$this->groupInstances->contains($groupInstance)) {
            $this->groupInstances->add($groupInstance);
            $groupInstance->setGroupID($this);
        }

        return $this;
    }

    public function removeGroupInstance(GroupInstance $groupInstance): static
    {
        if ($this->groupInstances->removeElement($groupInstance)) {
            if ($groupInstance->getGroupID() === $this) {
                $groupInstance->setGroupID(null);
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
            $belong->setGroupID($this);
        }

        return $this;
    }

    public function removeBelong(Belongs $belong): static
    {
        if ($this->belongs->removeElement($belong)) {
            if ($belong->getGroupID() === $this) {
                $belong->setGroupID(null);
            }
        }

        return $this;
    }
}
