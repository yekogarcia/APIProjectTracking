import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1768963733752 implements MigrationInterface {
    name = 'Init1768963733752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" DROP CONSTRAINT "FK_2a3577606fb821d170d678ea5f9"`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ALTER COLUMN "total_incomes" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ALTER COLUMN "total_expenses" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ADD CONSTRAINT "UQ_2a3577606fb821d170d678ea5f9" UNIQUE ("project_id")`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ADD CONSTRAINT "FK_2a3577606fb821d170d678ea5f9" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" DROP CONSTRAINT "FK_2a3577606fb821d170d678ea5f9"`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" DROP CONSTRAINT "UQ_2a3577606fb821d170d678ea5f9"`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ALTER COLUMN "total_expenses" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ALTER COLUMN "total_incomes" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ADD CONSTRAINT "FK_2a3577606fb821d170d678ea5f9" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
