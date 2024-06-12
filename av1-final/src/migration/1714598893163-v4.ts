import {MigrationInterface, QueryRunner} from "typeorm";

export class v41714598893163 implements MigrationInterface {
    name = 'v41714598893163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "codigo" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "codigo"`);
    }

}
