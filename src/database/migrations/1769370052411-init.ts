import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1769370052411 implements MigrationInterface {
    name = 'Init1769370052411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incomes" ADD "income_name" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incomes" DROP COLUMN "income_name"`);
    }

}
