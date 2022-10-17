import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666029042905 implements MigrationInterface {
    name = 'default1666029042905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Groups" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_fdd67065c74f974d0c175d0a865"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "desc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "prazo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "group_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_fdd67065c74f974d0c175d0a865" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_fdd67065c74f974d0c175d0a865"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "group_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "prazo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "desc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_fdd67065c74f974d0c175d0a865" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Groups" ALTER COLUMN "title" DROP NOT NULL`);
    }

}
