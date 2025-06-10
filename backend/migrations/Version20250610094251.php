<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250610094251 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE belongs (id SERIAL NOT NULL, button_template_id_id INT NOT NULL, group_id_id INT NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_47025A8E9A5BC465 ON belongs (button_template_id_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_47025A8E2F68B530 ON belongs (group_id_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs ADD CONSTRAINT FK_47025A8E9A5BC465 FOREIGN KEY (button_template_id_id) REFERENCES button_template (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs ADD CONSTRAINT FK_47025A8E2F68B530 FOREIGN KEY (group_id_id) REFERENCES "group" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance ADD button_template_id_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance ADD CONSTRAINT FK_885D30099A5BC465 FOREIGN KEY (button_template_id_id) REFERENCES button_template (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_885D30099A5BC465 ON button_instance (button_template_id_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs DROP CONSTRAINT FK_47025A8E9A5BC465
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs DROP CONSTRAINT FK_47025A8E2F68B530
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE belongs
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance DROP CONSTRAINT FK_885D30099A5BC465
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_885D30099A5BC465
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance DROP button_template_id_id
        SQL);
    }
}
