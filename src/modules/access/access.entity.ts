import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';

export enum Status {
    Entry = 'entry',
    Exit = 'exit',
}

@Entity('access')
export class Access extends BaseEntity {
    @PrimaryGeneratedColumn()
    access_id!: number;

    @Column({ type: 'int' })
    person_id!: number;

    @Column({ type: 'int' })
    room_id!: number;

    @ManyToOne(() => Person, person => person.accesses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'person_id', referencedColumnName: 'person_id' })
    person!: Person;

    @ManyToOne(() => Room, room => room.accesses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'room_id', referencedColumnName: 'room_id' })
    room!: Room;

    @Column({ type: 'datetime', nullable: false })
    entry_time!: Date;

    @Column({ type: 'datetime', nullable: true })
    exit_time!: Date | null;

    @Column({
        type: 'enum',
        enum: Status,
        nullable: false,
        default: Status.Entry
    })
    status!: Status;
}
