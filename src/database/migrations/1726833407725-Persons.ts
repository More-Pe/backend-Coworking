import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Persons1726833407725 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'persons',
                columns: [
                    {
                        name: 'person_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        isNullable: false,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enum: ['visitor', 'user', 'admin'],
                        isNullable: false,
                        default: `'visitor'`,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'startup',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'dni',
                        type: 'varchar',
                        length: '20',
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '20',
                        isNullable: true,
                    },
                    {
                        name: 'frequency_status',
                        type: 'enum',
                        enum: ['frequent', 'infrequent', 'absent'],
                        isNullable: false,
                        default: `'absent'`,
                    },
                ],
            }),
            true
        );
        await queryRunner.createForeignKey('persons', new TableForeignKey({
            columnNames: ['startup'],
            referencedTableName: 'startups',
            referencedColumnNames: ['name'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('persons');
        const foreignKeys = table!.foreignKeys;
        await queryRunner.dropForeignKey('persons', foreignKeys.find(fk => fk.columnNames.indexOf('startup') !== -1)!);
        await queryRunner.dropTable('persons');
    }
}
