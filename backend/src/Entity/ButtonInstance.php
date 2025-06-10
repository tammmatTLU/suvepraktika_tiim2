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
    private array $redux_state = [];

    #[ORM\ManyToOne(inversedBy: 'buttonInstances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $user_ID = null;

    #[ORM\ManyToOne(inversedBy: 'buttonInstances')]
    private ?ButtonTemplate $button_template_ID = null;

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

    public function getUserID(): ?user
    {
        return $this->user_ID;
    }

    public function setUserID(?user $user_ID): static
    {
        $this->user_ID = $user_ID;

        return $this;
    }

    public function getButtonTemplateID(): ?ButtonTemplate
    {
        return $this->button_template_ID;
    }

    public function setButtonTemplateID(?ButtonTemplate $button_template_ID): static
    {
        $this->button_template_ID = $button_template_ID;

        return $this;
    }
}
