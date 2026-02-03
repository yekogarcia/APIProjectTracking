import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1770087784214 implements MigrationInterface {
    name = 'Init1770087784214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "concepts" DROP CONSTRAINT "CHK_342c74862b3d35e37455c9ba2b"`);
        await queryRunner.query(`ALTER TABLE "concepts" ALTER COLUMN "type_expense" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "concepts" ALTER COLUMN "type_expense" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "concepts" ADD CONSTRAINT "CHK_342c74862b3d35e37455c9ba2b" CHECK (((type_expense)::text = ANY ((ARRAY['COSTO'::character varying, 'GASTO'::character varying])::text[])))`);
    }

}
