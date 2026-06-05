import { MigrationInterface, QueryRunner } from "typeorm";

export class Tasks1780565754764 implements MigrationInterface {
    name = 'Tasks1780565754764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "create_date"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "create_date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "create_date"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "create_date" date NOT NULL DEFAULT CURRENT_DATE`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")`);
    }

}
