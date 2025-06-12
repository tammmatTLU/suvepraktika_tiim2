<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250612125646 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template ADD room_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template ADD CONSTRAINT FK_5D0D9E5454177093 FOREIGN KEY (room_id) REFERENCES room (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_5D0D9E5454177093 ON button_template (room_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template DROP FOREIGN KEY FK_5D0D9E5454177093
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_5D0D9E5454177093 ON button_template
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template DROP room_id
        SQL);
    }
}
