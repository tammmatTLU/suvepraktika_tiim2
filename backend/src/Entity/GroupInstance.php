<?php

namespace App\Entity;

use App\Repository\GroupInstanceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GroupInstanceRepository::class)]
class GroupInstance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private array $redux_state = [];

   #[ORM\ManyToOne(targetEntity: Group::class, inversedBy: 'groupInstances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Group $group = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'groupInstances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReduxState(): array
    {
        return $this->redux_state;
    }

    public function setReduxState(array $redux_state): static
    {
        $this->redux_state = $redux_state;

        return $this;
    }

    public function getGroupID(): ?Group
    {
        return $this->group_ID;
    }

    public function setGroupID(?Group $group_ID): static
    {
        $this->group_ID = $group_ID;

        return $this;
    }

    public function getUserID(): ?User
    {
        return $this->user_ID;
    }

    public function setUserID(?User $user_ID): static
    {
        $this->user_ID = $user_ID;

        return $this;
    }
}
