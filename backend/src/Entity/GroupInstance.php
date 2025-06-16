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
    private array $reduxState = [];

    #[ORM\ManyToOne(inversedBy: 'groupInstances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'groupInstance')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ButtonGroup $buttonGroup = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReduxState(): array
    {
        return $this->reduxState;
    }

    public function setReduxState(array $reduxState): static
    {
        $this->reduxState = $reduxState;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getButtonGroup(): ?ButtonGroup
    {
        return $this->buttonGroup;
    }

    public function setButtonGroup(?ButtonGroup $buttonGroup): static
    {
        $this->buttonGroup = $buttonGroup;

        return $this;
    }

    public function serialize(): array
    {
        return [
            'id' => $this->getId(),
            'reduxState' => $this->getReduxState(),
            'user_id' => $this->getUser()?->getId(),
            'button_group_id' => $this->getButtonGroup()?->getId(),
        ];
    }
}
