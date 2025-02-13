"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMontadora1738863830673 = void 0;
class AddMontadora1738863830673 {
    name = 'AddMontadora1738863830673';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "montadora" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "PK_e7744dd041333b398aa7cc3265e" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "montadora"`);
    }
}
exports.AddMontadora1738863830673 = AddMontadora1738863830673;
