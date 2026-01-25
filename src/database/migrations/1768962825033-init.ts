import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1768962825033 implements MigrationInterface {
    name = 'Init1768962825033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "totals_incomes_expenses" ("id" SERIAL NOT NULL, "total_incomes" numeric(14,2) NOT NULL, "total_expenses" numeric(14,2) NOT NULL, "project_id" integer, CONSTRAINT "PK_a0a1ce738231b5ba363fe68c06f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ADD CONSTRAINT "FK_2a3577606fb821d170d678ea5f9" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" DROP CONSTRAINT "FK_2a3577606fb821d170d678ea5f9"`);
        await queryRunner.query(`DROP TABLE "totals_incomes_expenses"`);
    }

}
