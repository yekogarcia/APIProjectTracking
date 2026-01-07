import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1767407754765 implements MigrationInterface {
    name = 'Init1767407754765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "start_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "end_date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "startDate" TIMESTAMP NOT NULL`);
    }

}
