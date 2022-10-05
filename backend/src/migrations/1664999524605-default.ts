import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664999524605 implements MigrationInterface {
    name = 'default1664999524605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "desc" text NOT NULL, "state" text NOT NULL, "prazo" text NOT NULL, "created_at" TIMESTAMP NOT NULL, "group_id" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Grupos" ("id" SERIAL NOT NULL, "title" text NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_27106a912a4e36face11c5c50ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_438e3c81c9f4209c13483661157" FOREIGN KEY ("group_id") REFERENCES "Grupos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_438e3c81c9f4209c13483661157"`);
        await queryRunner.query(`DROP TABLE "Grupos"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
