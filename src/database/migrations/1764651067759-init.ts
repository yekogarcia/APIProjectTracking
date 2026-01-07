import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764651067759 implements MigrationInterface {
    name = 'Init1764651067759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" bigint NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companys" ("id" SERIAL NOT NULL, "type" character varying(20) NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(255) NOT NULL, "phone" bigint NOT NULL, "email" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_6bf4662faa4993f5326257cda41" UNIQUE ("email"), CONSTRAINT "PK_a4f1caae0b4e0af6fe3315cec31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "type_expense" character varying(20) NOT NULL, "concept" integer NOT NULL, "description" character varying(255) NOT NULL, "type" character varying(20) NOT NULL, "quantity" integer NOT NULL, "price" numeric(12,2) NOT NULL, "total_price" numeric(12,2) NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "project_id" integer, CONSTRAINT "CHK_c339ff7e1f2e8ad051d708f754" CHECK ("type_expense" IN ('COSTO', 'GASTO')), CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "type" character varying(20) NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "status" character varying(20) NOT NULL, "parent_id" integer, "user_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "CHK_2f0be0621e005e1de7f50647e4" CHECK ("type" IN ('PROJECT', 'SUBPROJECT')), CONSTRAINT "CHK_d332ab63cfd6ff122fd25d1363" CHECK ("status" IN ('ACTIVO', 'INACTIVO')), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "incomes" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "income_value" numeric(12,2) NOT NULL, "income_date" date NOT NULL, "payment_method" character varying(30) NOT NULL, "reference_number" character varying(30) NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "project_id" integer, CONSTRAINT "PK_d737b3d0314c1f0da5461a55e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "concepts" ("id" SERIAL NOT NULL, "concept" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "status" character varying(20) NOT NULL, "type_expense" character varying(20) NOT NULL, "view" character varying(20) NOT NULL DEFAULT 'ALL', "user_id" integer NOT NULL, "project_id" integer NOT NULL, "company_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "CHK_9fe58054ce67b5443ca10b4b51" CHECK ("type_expense" IN ('COSTOS', 'GASTOS')), CONSTRAINT "PK_0026cb8bc253eab30b171606891" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companys"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_25ecf373a719f0bc472480ce27a" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_c8708288b8e6a060ed7b9e1a226" FOREIGN KEY ("company_id") REFERENCES "companys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "incomes" ADD CONSTRAINT "FK_9cf17357223ddcdac737d236bcb" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incomes" DROP CONSTRAINT "FK_9cf17357223ddcdac737d236bcb"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_c8708288b8e6a060ed7b9e1a226"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_25ecf373a719f0bc472480ce27a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
        await queryRunner.query(`DROP TABLE "concepts"`);
        await queryRunner.query(`DROP TABLE "incomes"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TABLE "companys"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
