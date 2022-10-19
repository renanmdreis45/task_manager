import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666195983912 implements MigrationInterface {
    name = 'default1666195983912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_fdd67065c74f974d0c175d0a865"`);
        await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT "PK_be8543c3ec161e109d124cf9498"`);
        await queryRunner.query(`ALTER TABLE "Groups" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Groups" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Groups" ADD CONSTRAINT "PK_be8543c3ec161e109d124cf9498" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Groups" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "PK_f38c2a61ff630a16afca4dac442"`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "desc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "prazo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP COLUMN "group_id"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD "group_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_fdd67065c74f974d0c175d0a865" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_fdd67065c74f974d0c175d0a865"`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP COLUMN "group_id"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD "group_id" uuid`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "prazo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "desc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "PK_f38c2a61ff630a16afca4dac442"`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Groups" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT "PK_be8543c3ec161e109d124cf9498"`);
        await queryRunner.query(`ALTER TABLE "Groups" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Groups" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Groups" ADD CONSTRAINT "PK_be8543c3ec161e109d124cf9498" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_fdd67065c74f974d0c175d0a865" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
