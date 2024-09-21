import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Administration extends BaseEntity  {
    @PrimaryGeneratedColumn()
    report_id!: number;

    @Column({ type: 'datetime', default: () => 'now()' })
    report_date!: Date;

    @Column({ type: 'int' })
    total_accesses!: number;

    @Column({ type: 'int' })
    total_absences!: number;

    @Column({ type: 'text' })
    frequent_users!: string;

    @Column({ type: 'text' })
    infrequent_users!: string;
}
