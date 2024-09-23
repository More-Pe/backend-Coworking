import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AccessHistory1726833490683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'access_history',
                columns: [
                    {
                        name: 'history_id',
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
                        name: 'access_time',
                        type: 'datetime',
                        isNullable: false,
                    },
                    {
                        name: 'action',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['person_id'],
                        referencedTableName: 'person',
                        referencedColumnNames: ['person_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        columnNames: ['room_id'],
                        referencedTableName: 'room',
                        referencedColumnNames: ['room_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('access_history');
    }

}

