import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';

@Entity('access_history')
export class AccessHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    history_id!: number;

    @Column({ type: 'int' })
    person_id!: number;

    @ManyToOne(() => Person, person => person.access_histories, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'person_id', referencedColumnName: 'person_id' })
    person!: Person;

    @Column({ type: 'int' })
    room_id!: number;

    @ManyToOne(() => Room, room => room.accessHistories, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'room_id', referencedColumnName: 'room_id' })
    room!: Room;

    @Column({ type: 'datetime' })
    access_time!: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    action!: string;
}
