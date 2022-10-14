import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665783657874 implements MigrationInterface {
    name = 'default1665783657874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_1acb6f24be8e0ac0782cb8d598e"`);
        await queryRunner.query(`ALTER TABLE "Tasks" RENAME COLUMN "groupId" TO "group_id"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "group_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_fdd67065c74f974d0c175d0a865" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_fdd67065c74f974d0c175d0a865"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "group_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" RENAME COLUMN "group_id" TO "groupId"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_1acb6f24be8e0ac0782cb8d598e" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
