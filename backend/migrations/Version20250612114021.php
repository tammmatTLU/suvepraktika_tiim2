<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250612114021 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE belongs (id INT AUTO_INCREMENT NOT NULL, button_template_id INT NOT NULL, button_group_id INT NOT NULL, INDEX IDX_47025A8E9C879828 (button_template_id), INDEX IDX_47025A8E34395890 (button_group_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE button_group (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE button_instance (id INT AUTO_INCREMENT NOT NULL, redux_state JSON NOT NULL, user_id INT NOT NULL, button_template_id INT NOT NULL, INDEX IDX_885D3009A76ED395 (user_id), INDEX IDX_885D30099C879828 (button_template_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE button_template (id INT AUTO_INCREMENT NOT NULL, command VARCHAR(255) NOT NULL, name VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE device (id INT AUTO_INCREMENT NOT NULL, status INT NOT NULL, type VARCHAR(20) NOT NULL, room_id INT NOT NULL, INDEX IDX_92FB68E54177093 (room_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE group_instance (id INT AUTO_INCREMENT NOT NULL, redux_state JSON NOT NULL, user_id INT NOT NULL, button_group_id INT NOT NULL, INDEX IDX_4B00FDA1A76ED395 (user_id), INDEX IDX_4B00FDA134395890 (button_group_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE room (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, pwd_hash VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs ADD CONSTRAINT FK_47025A8E9C879828 FOREIGN KEY (button_template_id) REFERENCES button_template (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs ADD CONSTRAINT FK_47025A8E34395890 FOREIGN KEY (button_group_id) REFERENCES button_group (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance ADD CONSTRAINT FK_885D3009A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance ADD CONSTRAINT FK_885D30099C879828 FOREIGN KEY (button_template_id) REFERENCES button_template (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE device ADD CONSTRAINT FK_92FB68E54177093 FOREIGN KEY (room_id) REFERENCES room (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_instance ADD CONSTRAINT FK_4B00FDA1A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_instance ADD CONSTRAINT FK_4B00FDA134395890 FOREIGN KEY (button_group_id) REFERENCES button_group (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs DROP FOREIGN KEY FK_47025A8E9C879828
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs DROP FOREIGN KEY FK_47025A8E34395890
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance DROP FOREIGN KEY FK_885D3009A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance DROP FOREIGN KEY FK_885D30099C879828
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE device DROP FOREIGN KEY FK_92FB68E54177093
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_instance DROP FOREIGN KEY FK_4B00FDA1A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_instance DROP FOREIGN KEY FK_4B00FDA134395890
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE belongs
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE button_group
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
        $this->addSql(<<<'SQL'
            DROP TABLE group_instance
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE room
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user
        SQL);
    }
}
