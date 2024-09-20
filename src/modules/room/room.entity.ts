import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Access } from '../access/access.entity';
import { AccessHistory } from '../access_history/access_history.entity';

@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	id_room!: number;

	@Column({ type: 'varchar', length: 100 })
	room_name!: string;

	@Column({ type: 'int' })
	capacity!: number;

	@Column({ type: 'varchar', length: 50 })
	room_type!: string; // reuniones, oficinas, etc.

	@OneToMany(() => Access, access => access.room)
	accesses!: Access[];

	@OneToMany(() => AccessHistory, history => history.room)
	access_histories!: AccessHistory[];
}
