import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';

export enum Status {
    Entry = 'entry',
    Exit = 'exit',
}

@Entity()
export class Access {
    @PrimaryGeneratedColumn()
    access_id!: number;

    @ManyToOne(() => Person, person => person.accesses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'person_id', referencedColumnName: 'person_id' })
    person!: Person;

    @ManyToOne(() => Room, room => room.accesses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'room_id', referencedColumnName: 'room_id' })
    room!: Room;

    @Column({ type: 'datetime' })
    entry_time!: Date;

    @Column({ type: 'datetime', nullable: true })
    exit_time!: Date;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.Exit,
    })
    status!: Status;
}
