import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Startup1726747007725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "startups",
            columns: [
                {
                    name: "startup_id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "program",
                    type: "enum",
                    enum: ["Pre-Seed 2023", "CiberSecurity Startup"],
                    default: "'Pre-Seed 2023'"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("startups");
    }
}