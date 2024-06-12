import {MigrationInterface, QueryRunner} from "typeorm";

export class v31714597715617 implements MigrationInterface {
    name = 'v31714597715617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "descricao" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "codigo"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "codigo" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "codigo"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "codigo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "descricao" boolean NOT NULL`);
    }

}
