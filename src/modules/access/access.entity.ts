import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';

@Entity()
export class Access {
	@PrimaryGeneratedColumn()
	id_access!: number;

	@ManyToOne(() => Person, person => person.accesses)
	person!: Person;

	@ManyToOne(() => Room, room => room.accesses)
	room!: Room;

	@Column({ type: 'timestamp' })
	entry_time!: Date;

	@Column({ type: 'timestamp', nullable: true })
	exit_time!: Date;

	@Column({ type: 'varchar', length: 20 })
	status!: string; // 'entrada' o 'salida'
}
