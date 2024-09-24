import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Administration } from '../modules/administration/administration.entity';
import { Person } from '../modules/person/person.entity';
import { Room } from '../modules/room/room.entity';
import { Access } from '../modules/access/access.entity';
import { AccessHistory } from '../modules/access_history/access_history.entity';


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Person, Room, Access, AccessHistory, Administration],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
    logging: false,
    logger: 'advanced-console',
});