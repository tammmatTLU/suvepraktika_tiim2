<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;


#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column(length: 100)]
    private ?string $pwd_hash = null;

    /**
     * @var Collection<int, ButtonInstance>
     */
    #[ORM\OneToMany(targetEntity: ButtonInstance::class, mappedBy: 'user')]
    private Collection $buttonInstances;

    /**
     * @var Collection<int, GroupInstance>
     */
    #[ORM\OneToMany(targetEntity: GroupInstance::class, mappedBy: 'user')]
    private Collection $groupInstances;

    #[ORM\Column(length: 25)]
    private string $role = 'ROLE_USER';

    /**
     * @var Collection<int, Token>
     */
    #[ORM\OneToMany(targetEntity: Token::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $tokens;

    #[ORM\Column]
    private ?array $reduxSpan = [];

    public function __construct()
    {
        $this->buttonInstances = new ArrayCollection();
        $this->groupInstances = new ArrayCollection();
        $this->tokens = new ArrayCollection();
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

    public function getUserIdentifier(): string
    {
        return $this->name;
    }

     public function getPassword(): ?string
    {
        return $this->pwd_hash;
    }

    public function setPwdHash(string $pwd_hash): static
    {
        $this->pwd_hash = $pwd_hash;

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
            $buttonInstance->setUser($this);
        }

        return $this;
    }

    public function removeButtonInstance(ButtonInstance $buttonInstance): static
    {
        if ($this->buttonInstances->removeElement($buttonInstance)) {
            if ($buttonInstance->getUser() === $this) {
                $buttonInstance->setUser(null);
            }
        }

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
            $groupInstance->setUser($this);
        }

        return $this;
    }

    public function removeGroupInstance(GroupInstance $groupInstance): static
    {
        if ($this->groupInstances->removeElement($groupInstance)) {
            if ($groupInstance->getUser() === $this) {
                $groupInstance->setUser(null);
            }
        }

        return $this;
    }

    public function getRoles(): array
    {
        return [$this->role ?? 'ROLE_USER'];
    }

    public function setRole(string $role): static
    {
        $this->role = $role;

        return $this;
    }

    #[\Deprecated]
    public function eraseCredentials(): void
    {
    }

    /**
     * @return Collection<int, Token>
     */
    public function getTokens(): Collection
    {
        return $this->tokens;
    }

    public function addToken(Token $token): static
    {
        if (!$this->tokens->contains($token)) {
            $this->tokens->add($token);
            $token->setUser($this);
        }

        return $this;
    }

    public function removeToken(Token $token): static
    {
        if ($this->tokens->removeElement($token)) {
            // set the owning side to null (unless already changed)
            if ($token->getUser() === $this) {
                $token->setUser(null);
            }
        }

        return $this;
    }

    public function getReduxSpan(): array
    {
        return $this->reduxSpan;
    }

    public function setReduxSpan(array $reduxSpan): static
    {
        $this->reduxSpan = $reduxSpan;

        return $this;
    }
}
