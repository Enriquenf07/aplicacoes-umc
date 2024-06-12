import {MigrationInterface, QueryRunner} from "typeorm";

export class v51714768433170 implements MigrationInterface {
    name = 'v51714768433170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "quantidade" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "desconto" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "valorTotal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "productId" character varying`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD CONSTRAINT "FK_f5a51580ac3c24e0c35451a61e9" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendas" DROP CONSTRAINT "FK_f5a51580ac3c24e0c35451a61e9"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "valorTotal"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "desconto"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "quantidade"`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "admin" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "email" character varying NOT NULL`);
    }

}
