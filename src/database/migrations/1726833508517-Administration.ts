import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Administration1726833508517 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'administration',
                columns: [
                    {
                        name: 'report_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'report_date',
                        type: 'datetime',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'total_accesses',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'total_absences',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'frequent_users',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'infrequent_users',
                        type: 'text',
                        isNullable: false,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('administration');
    }

}

