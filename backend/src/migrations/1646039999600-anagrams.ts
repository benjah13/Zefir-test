import { MigrationInterface, QueryRunner } from 'typeorm';

export class anagrams1646039999600 implements MigrationInterface {
  name = 'anagrams1646039999600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "anagram" ("anagram_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying(200) NOT NULL, "anagram_map" jsonb NOT NULL, CONSTRAINT "PK_f394cfa3b852c94eaf8a4908580" PRIMARY KEY ("anagram_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "anagram"`);
  }
}
