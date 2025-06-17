<?php

namespace App\Entity;

use App\Repository\ButtonInstanceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ButtonInstanceRepository::class)]
class ButtonInstance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private array $reduxState = [];

    #[ORM\ManyToOne(inversedBy: 'buttonInstances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'buttonInstances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ButtonTemplate $buttonTemplate = null;

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

    public function getButtonTemplate(): ?ButtonTemplate
    {
        return $this->buttonTemplate;
    }

    public function setButtonTemplate(?ButtonTemplate $buttonTemplate): static
    {
        $this->buttonTemplate = $buttonTemplate;

        return $this;
    }

    public function serialize(): array
    {
        return [
            'id' => $this->getId(),
            'redux_state' => $this->getReduxState(),
            'user_id' => $this->getUser()?->getId(),
            'button_template_id' => $this->getButtonTemplate()?->getId()
        ];
    }
}
