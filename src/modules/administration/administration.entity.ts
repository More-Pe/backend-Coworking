import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Administration {
	@PrimaryGeneratedColumn()
	id_report!: number;

	@Column({ type: 'timestamp' })
	report_date!: Date;

	@Column({ type: 'int' })
	total_accesses!: number;

	@Column({ type: 'int' })
	total_absences!: number;

	@Column({ type: 'varchar', length: 255 })
	frequent_people!: string;

	@Column({ type: 'varchar', length: 255 })
	least_frequent_person!: string;
}
