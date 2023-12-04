import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmpleadosTable1701624130941 implements MigrationInterface {
  name = 'CreateEmpleadosTable1701624130941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "Empleados" ("dni" numeric NOT NULL, "edad" numeric NOT NULL, "nombre" character varying(30) NOT NULL, "cargo" character varying(30) NOT NULL, CONSTRAINT "PK_f9e0bab727c79997a14feaa2f85" PRIMARY KEY ("dni"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "Empleados"');
  }
}
