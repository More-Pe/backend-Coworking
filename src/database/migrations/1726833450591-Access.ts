import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

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
                        isNullable: false,
                        default: `'entry'`,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey('access', new TableForeignKey({
            columnNames: ['person_id'],
            referencedTableName: 'person',
            referencedColumnNames: ['person_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));

        await queryRunner.createForeignKey('access', new TableForeignKey({
            columnNames: ['room_id'],
            referencedTableName: 'room',
            referencedColumnNames: ['room_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('access');
        const foreignKeys = table!.foreignKeys;

        await queryRunner.dropForeignKey('access', foreignKeys.find(fk => fk.columnNames.indexOf('person_id') !== -1)!);
        await queryRunner.dropForeignKey('access', foreignKeys.find(fk => fk.columnNames.indexOf('room_id') !== -1)!);

        await queryRunner.dropTable('access');
    }

}