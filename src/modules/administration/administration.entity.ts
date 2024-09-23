import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Administration extends BaseEntity {
    @PrimaryGeneratedColumn()
    admin_id!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password!: string;
}
