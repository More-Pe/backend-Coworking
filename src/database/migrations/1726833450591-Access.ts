import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Access1726833450591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'access',
                columns: [
                    {
                        name: 'access_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'person_id',
                        type: 'int',
                    },
                    {
                        name: 'room_id',
                        type: 'int',
                    },
                    {
                        name: 'entry_time',
                        type: 'datetime',
                        isNullable: false,
                    },
                    {
                        name: 'exit_time',
                        type: 'datetime',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['entry', 'exit'],
                        default: `'exit'`,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['person_id'],
                        referencedTableName: 'persons',
                        referencedColumnNames: ['person_id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['room_id'],
                        referencedTableName: 'rooms',
                        referencedColumnNames: ['room_id'],
                        onDelete: 'CASCADE',
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('access');
    }

}
