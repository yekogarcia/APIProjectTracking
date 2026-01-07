import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1767569643929 implements MigrationInterface {
    name = 'Init1767569643929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "total_projects" ADD CONSTRAINT "UQ_937da4dee5dcbb19ed2e044530d" UNIQUE ("status", "company_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "total_projects" DROP CONSTRAINT "UQ_937da4dee5dcbb19ed2e044530d"`);
    }

}
