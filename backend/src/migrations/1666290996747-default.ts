import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666290996747 implements MigrationInterface {
    name = 'default1666290996747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be8543c3ec161e109d124cf9498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "desc" character varying NOT NULL, "prazo" character varying NOT NULL, "state" character varying NOT NULL, "group_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_fdd67065c74f974d0c175d0a865" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_fdd67065c74f974d0c175d0a865"`);
        await queryRunner.query(`DROP TABLE "Tasks"`);
        await queryRunner.query(`DROP TABLE "Groups"`);
    }

}
