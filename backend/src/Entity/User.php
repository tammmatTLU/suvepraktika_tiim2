<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 25)]
    private ?string $user_name = null;

    #[ORM\Column(length: 100)]
    private ?string $pwd_hash = null;

    /**
     * @var Collection<int, GroupInstance>
     */
    #[ORM\OneToMany(targetEntity: GroupInstance::class, mappedBy: 'user_ID')]
    private Collection $groupInstances;

    /**
     * @var Collection<int, ButtonInstance>
     */
    #[ORM\OneToMany(targetEntity: ButtonInstance::class, mappedBy: 'user_ID')]
    private Collection $buttonInstances;

    public function __construct()
    {
        $this->groupInstances = new ArrayCollection();
        $this->buttonInstances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserName(): ?string
    {
        return $this->user_name;
    }

    public function setUserName(string $user_name): static
    {
        $this->user_name = $user_name;

        return $this;
    }

    public function getPwdHash(): ?string
    {
        return $this->pwd_hash;
    }

    public function setPwdHash(string $pwd_hash): static
    {
        $this->pwd_hash = $pwd_hash;

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
            $groupInstance->setUserID($this);
        }

        return $this;
    }

    public function removeGroupInstance(GroupInstance $groupInstance): static
    {
        if ($this->groupInstances->removeElement($groupInstance)) {
            if ($groupInstance->getUserID() === $this) {
                $groupInstance->setUserID(null);
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
            $buttonInstance->setUserID($this);
        }

        return $this;
    }

    public function removeButtonInstance(ButtonInstance $buttonInstance): static
    {
        if ($this->buttonInstances->removeElement($buttonInstance)) {
            // set the owning side to null (unless already changed)
            if ($buttonInstance->getUserID() === $this) {
                $buttonInstance->setUserID(null);
            }
        }

        return $this;
    }
}
