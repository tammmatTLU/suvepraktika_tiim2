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

    #[ORM\ManyToOne(inversedBy: 'groupInstances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?group $group_ID = null;

    #[ORM\ManyToOne(inversedBy: 'groupInstances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $user_ID = null;

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

    public function getGroupID(): ?group
    {
        return $this->group_ID;
    }

    public function setGroupID(?group $group_ID): static
    {
        $this->group_ID = $group_ID;

        return $this;
    }

    public function getUserID(): ?user
    {
        return $this->user_ID;
    }

    public function setUserID(?user $user_ID): static
    {
        $this->user_ID = $user_ID;

        return $this;
    }
}
