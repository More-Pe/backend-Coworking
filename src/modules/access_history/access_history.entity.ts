import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';

@Entity()
export class AccessHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    history_id!: number;

    @ManyToOne(() => Person, person => person.access_histories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'person_id', referencedColumnName: 'person_id' })
    person!: Person;

    @ManyToOne(() => Room, room => room.accesses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'room_id', referencedColumnName: 'room_id' })
    room!: Room;

    @Column({ type: 'datetime' })
    entry_time!: Date;

    @Column({ type: 'datetime', nullable: true })
    exit_time!: Date;
}
