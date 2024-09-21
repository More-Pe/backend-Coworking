import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Access } from '../access/access.entity';
import { AccessHistory } from '../access_history/access_history.entity';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Entity()
export class Person extends BaseEntity { 
    @PrimaryGeneratedColumn()
    person_id!: number;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User,
    })
    role!: Role;

    @Column({ type: 'varchar', length: 100 })
    first_name!: string;

    @Column({ type: 'varchar', length: 100 })
    last_name!: string;

    @Column({ type: 'varchar', length: 100 })
    startup!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    dni!: string;

    @Column({ type: 'varchar', length: 20 })
    phone!: string;

    @OneToMany(() => Access, access => access.person)
    accesses!: Access[];

    @OneToMany(() => AccessHistory, history => history.person)
    access_histories!: AccessHistory[];
}



