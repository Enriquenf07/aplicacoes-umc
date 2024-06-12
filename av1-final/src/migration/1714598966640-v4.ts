import {MigrationInterface, QueryRunner} from "typeorm";

export class v41714598966640 implements MigrationInterface {
    name = 'v41714598966640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "descricao" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "admin" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "email" character varying NOT NULL`);
    }

}
