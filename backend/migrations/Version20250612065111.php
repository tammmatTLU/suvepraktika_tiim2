<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250612065111 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE belongs (id INT AUTO_INCREMENT NOT NULL, button_template_id_id INT NOT NULL, group_id_id INT NOT NULL, INDEX IDX_47025A8E9A5BC465 (button_template_id_id), INDEX IDX_47025A8E2F68B530 (group_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE button_instance (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, button_template_id_id INT DEFAULT NULL, redux_state JSON NOT NULL COMMENT '(DC2Type:json)', INDEX IDX_885D30099D86650F (user_id_id), INDEX IDX_885D30099A5BC465 (button_template_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE button_template (id INT AUTO_INCREMENT NOT NULL, room_id_id INT NOT NULL, command VARCHAR(255) NOT NULL, name VARCHAR(50) NOT NULL, INDEX IDX_5D0D9E5435F83FFC (room_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE device (id INT AUTO_INCREMENT NOT NULL, room_id_id INT NOT NULL, status INT NOT NULL, type VARCHAR(50) NOT NULL, INDEX IDX_92FB68E35F83FFC (room_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE `group` (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE group_instance (id INT AUTO_INCREMENT NOT NULL, group_id_id INT NOT NULL, user_id_id INT NOT NULL, redux_state JSON NOT NULL COMMENT '(DC2Type:json)', INDEX IDX_4B00FDA12F68B530 (group_id_id), INDEX IDX_4B00FDA19D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE room (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, user_name VARCHAR(25) NOT NULL, pwd_hash VARCHAR(100) NOT NULL, role VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs ADD CONSTRAINT FK_47025A8E9A5BC465 FOREIGN KEY (button_template_id_id) REFERENCES button_template (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs ADD CONSTRAINT FK_47025A8E2F68B530 FOREIGN KEY (group_id_id) REFERENCES `group` (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance ADD CONSTRAINT FK_885D30099D86650F FOREIGN KEY (user_id_id) REFERENCES `user` (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance ADD CONSTRAINT FK_885D30099A5BC465 FOREIGN KEY (button_template_id_id) REFERENCES button_template (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template ADD CONSTRAINT FK_5D0D9E5435F83FFC FOREIGN KEY (room_id_id) REFERENCES room (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE device ADD CONSTRAINT FK_92FB68E35F83FFC FOREIGN KEY (room_id_id) REFERENCES room (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_instance ADD CONSTRAINT FK_4B00FDA12F68B530 FOREIGN KEY (group_id_id) REFERENCES `group` (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_instance ADD CONSTRAINT FK_4B00FDA19D86650F FOREIGN KEY (user_id_id) REFERENCES `user` (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs DROP FOREIGN KEY FK_47025A8E9A5BC465
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE belongs DROP FOREIGN KEY FK_47025A8E2F68B530
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance DROP FOREIGN KEY FK_885D30099D86650F
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_instance DROP FOREIGN KEY FK_885D30099A5BC465
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE button_template DROP FOREIGN KEY FK_5D0D9E5435F83FFC
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE device DROP FOREIGN KEY FK_92FB68E35F83FFC
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_instance DROP FOREIGN KEY FK_4B00FDA12F68B530
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_instance DROP FOREIGN KEY FK_4B00FDA19D86650F
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE belongs
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
            DROP TABLE `group`
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE group_instance
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE room
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE `user`
        SQL);
    }
}
