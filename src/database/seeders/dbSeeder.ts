import { AppDataSource } from '../db';
import { PersonSeeder } from './person.seeder';
import { RoomSeeder } from './room.seeder';

const runSeeders = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected');

        const personSeeder = new PersonSeeder();
        await personSeeder.run();


        const roomSeeder = new RoomSeeder();
        await roomSeeder.run();
        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await AppDataSource.destroy();
    }
};

runSeeders();