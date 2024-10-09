import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('administration')
export class Administration extends BaseEntity {
    @PrimaryGeneratedColumn()
    report_id!: number;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    report_date!: Date;

    @Column({
        type: 'int',
        nullable: false,
    })
    total_accesses!: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    total_absences!: number;

    @Column({
        type: 'text',
        nullable: false,
    })
    frequent_users!: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    infrequent_users!: string;
}