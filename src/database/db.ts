import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Persons1726833407725 } from './migrations/1726833407725-Persons';
import { Rooms1726833417916 } from './migrations/1726833417916-Rooms';
import { Access1726833450591 } from './migrations/1726833450591-Access';
import { AccessHistory1726833490683 } from './migrations/1726833490683-AccessHistory';
import { Administration } from '../modules/administration/administration.entity';
import { Person } from '../modules/person/person.entity';
import { Room } from '../modules/room/room.entity';
import { Access } from '../modules/access/access.entity';
import { AccessHistory } from '../modules/access_history/access_history.entity';


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || 'host.docker.internal',
    port: Number(process.env.DB_PORT) || 3310,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Person, Room, Access, AccessHistory, Administration],
    migrations: [Persons1726833407725, Rooms1726833417916, Access1726833450591, AccessHistory1726833490683, Administration],
    synchronize: false,
    logging: true,
});