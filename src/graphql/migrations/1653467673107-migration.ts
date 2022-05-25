import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1653467673107 implements MigrationInterface {
    name = 'migration1653467673107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userEmail\` varchar(255) NOT NULL, \`userDisplayName\` varchar(255) NOT NULL, \`sqlAction\` varchar(255) NOT NULL, \`entityId\` int NOT NULL, \`entityName\` varchar(255) NOT NULL, \`entity\` json NOT NULL, \`operationType\` varchar(255) NOT NULL, \`operationName\` varchar(255) NOT NULL, \`fieldName\` varchar(255) NULL, \`variables\` json NULL, \`errorMessage\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`displayName\` varchar(255) NOT NULL, \`photoURL\` varchar(255) NULL, \`firebaseUid\` varchar(255) NOT NULL, \`lineUserId\` varchar(255) NULL, \`active\` tinyint NOT NULL, \`role\` enum ('admin', 'user') NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bank\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`item\` varchar(255) NOT NULL, \`bankId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notif_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`cronTimeString\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`actual_notif_time\` datetime NOT NULL, \`notificationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`uid\` varchar(255) NOT NULL, \`type\` enum ('account_day', 'payment_day', 'other') NOT NULL, \`happened_time\` datetime NOT NULL, \`notif_time\` datetime NOT NULL, \`message\` varchar(255) NOT NULL, \`repeatType\` enum ('never', 'every_day', 'every_week', 'every_month', 'every_year') NOT NULL, \`tagText\` varchar(2) NOT NULL, \`tagColor\` varchar(255) NOT NULL, \`textColor\` varchar(255) NOT NULL, \`cronTimeString\` varchar(255) NOT NULL, \`eventId\` int NULL, UNIQUE INDEX \`IDX_1edf31d5ec945e12ea193b4fb1\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`line_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`uuid\` varchar(255) NOT NULL, \`to\` json NOT NULL, \`message\` json NOT NULL, \`action\` enum ('replyMessage', 'pushMessage', 'multicast', 'broadcast') NOT NULL, \`errorMsg\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`record\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`date\` date NOT NULL, \`item\` varchar(255) NOT NULL, \`merchant\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`isClosed\` tinyint NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_f946d2607a2f7052201ece77fa3\` FOREIGN KEY (\`bankId\`) REFERENCES \`bank\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_01cd2b829e0263917bf570cb672\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notif_log\` ADD CONSTRAINT \`FK_7311cb6d95b7bd803097c7da0d0\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_4d8dd208e427731306a6be66add\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`record\` ADD CONSTRAINT \`FK_8675cd3761984947c2506f39a25\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP FOREIGN KEY \`FK_8675cd3761984947c2506f39a25\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_4d8dd208e427731306a6be66add\``);
        await queryRunner.query(`ALTER TABLE \`notif_log\` DROP FOREIGN KEY \`FK_7311cb6d95b7bd803097c7da0d0\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_01cd2b829e0263917bf570cb672\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_f946d2607a2f7052201ece77fa3\``);
        await queryRunner.query(`DROP TABLE \`record\``);
        await queryRunner.query(`DROP TABLE \`line_log\``);
        await queryRunner.query(`DROP INDEX \`IDX_1edf31d5ec945e12ea193b4fb1\` ON \`notification\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`notif_log\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP TABLE \`bank\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`log\``);
    }

}
