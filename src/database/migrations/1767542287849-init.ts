import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1767542287849 implements MigrationInterface {
    name = 'Init1767542287849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_25ecf373a719f0bc472480ce27a"`);
        await queryRunner.query(`ALTER TABLE "incomes" DROP CONSTRAINT "FK_9cf17357223ddcdac737d236bcb"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_c8708288b8e6a060ed7b9e1a226"`);
        await queryRunner.query(`CREATE TABLE "total_projects" ("id" SERIAL NOT NULL, "status" character varying(50) NOT NULL, "total" integer NOT NULL, "company_id" integer, CONSTRAINT "PK_d30067270a4dba1fc42f4f5d820" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "totals_incomes_expenses" ("id" SERIAL NOT NULL, "total_incomes" numeric(14,2) NOT NULL, "total_expenses" numeric(14,2) NOT NULL, "project_id" integer, CONSTRAINT "PK_a0a1ce738231b5ba363fe68c06f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "total_projects" ADD CONSTRAINT "FK_ff674f86557de4cf9e9219cc742" FOREIGN KEY ("company_id") REFERENCES "companys"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_25ecf373a719f0bc472480ce27a" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "incomes" ADD CONSTRAINT "FK_9cf17357223ddcdac737d236bcb" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_c8708288b8e6a060ed7b9e1a226" FOREIGN KEY ("company_id") REFERENCES "companys"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" ADD CONSTRAINT "FK_2a3577606fb821d170d678ea5f9" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "totals_incomes_expenses" DROP CONSTRAINT "FK_2a3577606fb821d170d678ea5f9"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_c8708288b8e6a060ed7b9e1a226"`);
        await queryRunner.query(`ALTER TABLE "incomes" DROP CONSTRAINT "FK_9cf17357223ddcdac737d236bcb"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_25ecf373a719f0bc472480ce27a"`);
        await queryRunner.query(`ALTER TABLE "total_projects" DROP CONSTRAINT "FK_ff674f86557de4cf9e9219cc742"`);
        await queryRunner.query(`DROP TABLE "totals_incomes_expenses"`);
        await queryRunner.query(`DROP TABLE "total_projects"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_c8708288b8e6a060ed7b9e1a226" FOREIGN KEY ("company_id") REFERENCES "companys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "incomes" ADD CONSTRAINT "FK_9cf17357223ddcdac737d236bcb" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_25ecf373a719f0bc472480ce27a" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
