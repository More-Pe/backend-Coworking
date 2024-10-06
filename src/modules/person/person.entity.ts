import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Access } from '../access/access.entity';
import { Startup } from '../startup/startup.entity';
import { AccessHistory } from '../access_history/access_history.entity';

export enum Role {
    Visitor = 'visitor',
    User = 'user',
    Admin = 'admin',
}

export enum Frequency_status {
    Frequent = 'frequent',
    Infrequent = 'infrequent',
    Absent = 'absent',
}

@Entity('persons')

export class Person extends BaseEntity { 
    @PrimaryGeneratedColumn()
    person_id!: number;

    @Column({
        type: 'enum',
        enum: Role,
        nullable: false,
        default: Role.Visitor,
    })
    role!: Role;

    @Column({ type: 'varchar', length: 100, nullable: false })
    first_name!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    last_name!: string;

    @ManyToOne(() => Startup, startup => startup.persons)
    @JoinColumn({ name: 'startup', referencedColumnName: 'name'})
    startup!: Startup;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password!: string;

    @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
    dni!: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone!: string;

    @Column({
        type: 'enum',
        enum: Frequency_status,
        nullable: false,
        default: Frequency_status.Absent,
    })
    frequency_status!: Frequency_status;

    @OneToMany(() => Access, access => access.person)
    accesses!: Access[];

    @OneToMany(() => AccessHistory, history => history.person)
    access_histories!: AccessHistory[];
}