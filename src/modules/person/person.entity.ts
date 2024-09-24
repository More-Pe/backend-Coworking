import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Access } from '../access/access.entity';
import { AccessHistory } from '../access_history/access_history.entity';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Entity('persons')

export class Person extends BaseEntity { 
    @PrimaryGeneratedColumn()
    person_id!: number;

    @Column({
        type: 'enum',
        enum: Role,
        nullable: false,
        default: Role.User,
    })
    role!: Role;

    @Column({ type: 'varchar', length: 100, nullable: false })
    first_name!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    last_name!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    startup!: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password!: string;

    @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
    dni!: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone!: string;

    @OneToMany(() => Access, access => access.person)
    accesses!: Access[];

    @OneToMany(() => AccessHistory, history => history.person)
    access_histories!: AccessHistory[];
}



