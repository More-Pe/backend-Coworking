import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Access } from '../access/access.entity';

@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	room_id!: number;

	@Column({ type: 'varchar', length: 100 })
	room_name!: string;

	@Column({ type: 'int' })
	capacity!: number;

	@Column({ type: 'varchar', length: 50 })
	room_type!: string; // meetings, offices, etc.

	@OneToMany(() => Access, access => access.room)
	accesses!: Access[];
}
