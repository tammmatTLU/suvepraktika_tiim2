<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250611080807 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template ADD room_id_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template ADD CONSTRAINT FK_5D0D9E5435F83FFC FOREIGN KEY (room_id_id) REFERENCES room (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_5D0D9E5435F83FFC ON button_template (room_id_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "user" ADD role VARCHAR(25) NOT NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template DROP CONSTRAINT FK_5D0D9E5435F83FFC
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_5D0D9E5435F83FFC
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template DROP room_id_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "user" DROP role
        SQL);
    }
}
