import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatecontactEntity1690815263707 implements MigrationInterface {
    name = 'CreatecontactEntity1690815263707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(60) NOT NULL, "email" character varying(45) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "registeredAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "clientId" uuid, CONSTRAINT "UQ_6ce9431339408199b0f65aed95f" UNIQUE ("fullName"), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "UQ_4e47a45a83eaebee77a193b5b7e" UNIQUE ("phoneNumber"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
