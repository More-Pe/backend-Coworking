import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';

export enum Program {
    PreSeed2023 = 'Pre-Seed 2023',
    CiberSecurity = 'Cibersecurity Startup'
}

@Entity('startups')
export class Startup extends BaseEntity {
    @PrimaryGeneratedColumn()
    startup_id!: number;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({
        type: 'enum',
        enum: Program,
        nullable: false,
        default: Program.PreSeed2023,
    })
    program!: Program;

    @OneToMany(() => Person, person => person.startup)
    persons!: Person[];
}