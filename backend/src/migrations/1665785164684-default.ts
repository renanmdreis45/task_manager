import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665785164684 implements MigrationInterface {
    name = 'default1665785164684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_1acb6f24be8e0ac0782cb8d598e"`);
        await queryRunner.query(`ALTER TABLE "Tasks" RENAME COLUMN "groupId" TO "group_id"`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "PK_f38c2a61ff630a16afca4dac442"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "PK_0393e435cf5bad4633bc9dd7500" PRIMARY KEY ("id", "group_id")`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "group_id" SET NOT NULL`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "Tasks_group_id_seq" OWNED BY "Tasks"."group_id"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "group_id" SET DEFAULT nextval('"Tasks_group_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_fdd67065c74f974d0c175d0a865" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_fdd67065c74f974d0c175d0a865"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "group_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "Tasks_group_id_seq"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ALTER COLUMN "group_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "PK_0393e435cf5bad4633bc9dd7500"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Tasks" RENAME COLUMN "group_id" TO "groupId"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_1acb6f24be8e0ac0782cb8d598e" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
