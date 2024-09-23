import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Access } from '../access/access.entity';
import { AccessHistory } from '../access_history/access_history.entity';

@Entity()
export class Room extends BaseEntity {
	@PrimaryGeneratedColumn()
	room_id!: number;

	@Column({ type: 'varchar', length: 100, nullable: false })
	room_name!: string;

	@Column({ type: 'int', nullable: false })
	capacity!: number;

	@Column({ type: 'varchar', length: 50, nullable: false })
	room_type!: string; // meetings, offices, etc.

	@OneToMany(() => Access, access => access.room)
	accesses!: Access[];

	@OneToMany(() => AccessHistory, accessHistory => accessHistory.room)
	accessHistories!: AccessHistory[];
}