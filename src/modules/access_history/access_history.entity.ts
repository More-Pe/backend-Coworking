import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';

@Entity()
export class AccessHistory {
	@PrimaryGeneratedColumn()
	id_history!: number;

	@ManyToOne(() => Person, person => person.access_histories)
	person!: Person;

	@ManyToOne(() => Room, room => room.access_histories)
	room!: Room;

	@Column({ type: 'timestamp' })
	entry_time!: Date;

	@Column({ type: 'timestamp', nullable: true })
	exit_time!: Date;
}
