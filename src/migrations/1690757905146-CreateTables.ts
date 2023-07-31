import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1690757905146 implements MigrationInterface {
    name = 'CreateTables1690757905146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(60) NOT NULL, "email" character varying(45) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "registeredAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "password" character varying(120) NOT NULL, CONSTRAINT "UQ_25d9f2389e76c4afb9642b096d8" UNIQUE ("fullName"), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "UQ_c7997e228eb23f5f3931ac6701c" UNIQUE ("phoneNumber"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
