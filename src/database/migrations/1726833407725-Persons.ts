import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enum: ['user', 'admin'],
                        isNullable: false,
                        default: `'user'`,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
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
						length: '12',
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
                    }
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('persons');
    }
}



