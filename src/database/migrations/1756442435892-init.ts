import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756442435892 implements MigrationInterface {
    name = 'Init1756442435892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "parent_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "parent_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "parent_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "parent_id" SET NOT NULL`);
    }

}
