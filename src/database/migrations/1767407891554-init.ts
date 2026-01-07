import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1767407891554 implements MigrationInterface {
    name = 'Init1767407891554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "start_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "end_date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "end_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "start_date" TIMESTAMP NOT NULL`);
    }

}
