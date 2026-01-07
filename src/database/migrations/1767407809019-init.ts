import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1767407809019 implements MigrationInterface {
    name = 'Init1767407809019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "end_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "end_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "end_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "end_date" SET NOT NULL`);
    }

}
