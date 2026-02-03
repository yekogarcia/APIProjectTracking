import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1770092669420 implements MigrationInterface {
    name = 'Init1770092669420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "CHK_c339ff7e1f2e8ad051d708f754"`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "CHK_efbf0444d49e588a4e9364be90" CHECK ("type_expense" IN ('COSTO', 'GASTO', 'ACTIVO'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "CHK_efbf0444d49e588a4e9364be90"`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "CHK_c339ff7e1f2e8ad051d708f754" CHECK (((type_expense)::text = ANY ((ARRAY['COSTO'::character varying, 'GASTO'::character varying])::text[])))`);
    }

}
