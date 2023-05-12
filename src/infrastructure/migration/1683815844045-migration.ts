import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1683815844045 implements MigrationInterface {
    name = 'migration1683815844045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("
            CREATE TABLE `user` (
                `id` int NOT NULL AUTO_INCREMENT,
                `email` varchar(255) NOT NULL,
                `firstName` varchar(255) NOT NULL,
                UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
                PRIMARY KEY (`id`)
            ) ENGINE = InnoDB
        ");
        await queryRunner.query("
            CREATE TABLE `tag` (
                `id` int NOT NULL AUTO_INCREMENT,
                `name` varchar(255) NOT NULL,
                UNIQUE INDEX `IDX_6a9775008add570dc3e5a0bab7` (`name`),
                PRIMARY KEY (`id`)
            ) ENGINE = InnoDB
        ");
        await queryRunner.query("
            CREATE TABLE `video` (
                `id` int NOT NULL AUTO_INCREMENT,
                `title` varchar(255) NOT NULL,
                `channelId` int NULL,
                PRIMARY KEY (`id`)
            ) ENGINE = InnoDB
        ");
        await queryRunner.query("
            CREATE TABLE `channel` (
                `id` int NOT NULL AUTO_INCREMENT,
                `name` varchar(255) NOT NULL,
                `userId` int NULL,
                UNIQUE INDEX `REL_823bae55bd81b3be6e05cff438` (`userId`),
                PRIMARY KEY (`id`)
            ) ENGINE = InnoDB
        ");
        await queryRunner.query("
            CREATE TABLE `video_tags_tag` (
                `videoId` int NOT NULL,
                `tagId` int NOT NULL,
                INDEX `IDX_4e03ab28eb389a49b5179ac600` (`videoId`),
                INDEX `IDX_cfacd951e1dee14c179c727205` (`tagId`),
                PRIMARY KEY (`videoId`, `tagId`)
            ) ENGINE = InnoDB
        ");
        await queryRunner.query("
            ALTER TABLE `video`
            ADD CONSTRAINT `FK_2edd2d5b91d15d5262356ab2a5b` FOREIGN KEY (`channelId`) REFERENCES `channel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
        ");
        await queryRunner.query("
            ALTER TABLE `channel`
            ADD CONSTRAINT `FK_823bae55bd81b3be6e05cff4383` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
        ");
        await queryRunner.query("
            ALTER TABLE `video_tags_tag`
            ADD CONSTRAINT `FK_4e03ab28eb389a49b5179ac6002` FOREIGN KEY (`videoId`) REFERENCES `video`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
        ");
        await queryRunner.query("
            ALTER TABLE `video_tags_tag`
            ADD CONSTRAINT `FK_cfacd951e1dee14c179c7272059` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
        ");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("
            ALTER TABLE `video_tags_tag` DROP FOREIGN KEY `FK_cfacd951e1dee14c179c7272059`
        ");
        await queryRunner.query("
            ALTER TABLE `video_tags_tag` DROP FOREIGN KEY `FK_4e03ab28eb389a49b5179ac6002`
        ");
        await queryRunner.query("
            ALTER TABLE `channel` DROP FOREIGN KEY `FK_823bae55bd81b3be6e05cff4383`
        ");
        await queryRunner.query("
            ALTER TABLE `video` DROP FOREIGN KEY `FK_2edd2d5b91d15d5262356ab2a5b`
        ");
        await queryRunner.query("
            DROP INDEX `IDX_cfacd951e1dee14c179c727205` ON `video_tags_tag`
        ");
        await queryRunner.query("
            DROP INDEX `IDX_4e03ab28eb389a49b5179ac600` ON `video_tags_tag`
        ");
        await queryRunner.query("
            DROP TABLE `video_tags_tag`
        ");
        await queryRunner.query("
            DROP INDEX `REL_823bae55bd81b3be6e05cff438` ON `channel`
        ");
        await queryRunner.query("
            DROP TABLE `channel`
        ");
        await queryRunner.query("
            DROP TABLE `video`
        ");
        await queryRunner.query("
            DROP INDEX `IDX_6a9775008add570dc3e5a0bab7` ON `tag`
        ");
        await queryRunner.query("
            DROP TABLE `tag`
        ");
        await queryRunner.query("
            DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`
        ");
        await queryRunner.query("
            DROP TABLE `user`
        ");
    }

}
