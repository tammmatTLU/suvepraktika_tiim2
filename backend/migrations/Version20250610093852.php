<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250610093852 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE button_instance (id SERIAL NOT NULL, user_id_id INT NOT NULL, redux_state JSON NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_885D30099D86650F ON button_instance (user_id_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE button_template (id SERIAL NOT NULL, command VARCHAR(255) NOT NULL, name VARCHAR(50) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE device (id SERIAL NOT NULL, room_id_id INT NOT NULL, status INT NOT NULL, type VARCHAR(50) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_92FB68E35F83FFC ON device (room_id_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance ADD CONSTRAINT FK_885D30099D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE device ADD CONSTRAINT FK_92FB68E35F83FFC FOREIGN KEY (room_id_id) REFERENCES room (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance DROP CONSTRAINT FK_885D30099D86650F
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE device DROP CONSTRAINT FK_92FB68E35F83FFC
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE button_instance
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE button_template
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE device
        SQL);
    }
}
