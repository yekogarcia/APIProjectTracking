import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1766463719919 implements MigrationInterface {
    name = 'Init1766463719919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "CHK_d332ab63cfd6ff122fd25d1363"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "CHK_17e2279137b998e78130d761ba" CHECK ("status" IN ('ACTIVE', 'SUSPENDED', 'RUNNING', 'CANCELED', 'COMPLETED'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "CHK_17e2279137b998e78130d761ba"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "CHK_d332ab63cfd6ff122fd25d1363" CHECK (((status)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying])::text[])))`);
    }

}
