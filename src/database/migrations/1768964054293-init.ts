import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1768964054293 implements MigrationInterface {
    name = 'Init1768964054293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" ADD "expense_date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "expense_date"`);
    }

}
