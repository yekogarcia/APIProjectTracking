import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1767405531858 implements MigrationInterface {
    name = 'Init1767405531858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "endDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "startDate"`);
    }

}
