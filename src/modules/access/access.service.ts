import { Access, Status } from './access.entity';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';
import { IsNull } from 'typeorm';

export class AccessService {
    public static async registerEntry(person_id: number, room_id: number): Promise<Access> {
        const person = await Person.findOne({ where: { person_id } });
        if (!person) {
            throw new Error('Person not found');
        }

        const room = await Room.findOne({ where: { room_id } });
        if (!room) {
            throw new Error('Room not found');
        }

        const existingAccess = await Access.findOne({
            where: {
                person: person,
                room: room,
                status: Status.Entry,
                exit_time: IsNull(),
            },
        });

        if (existingAccess) {
            throw new Error('You have already registered an entry in this room without registering an exit');
        }

        const currentPeople = await AccessService.getCurrentPeopleInRoom(room_id);
        if (currentPeople.length >= room.capacity) {
            throw new Error('The room has reached its maximum capacity');
        }

        const access = Access.create({
            person: person,
            room: room,
            entry_time: new Date(),
            status: Status.Entry,
        });

        return await access.save();
    }

    public static async registerExit(person_id: number, room_id: number): Promise<Access> {

        const person = await Person.findOne({ where: { person_id } });

        
        if (!person) {
            throw new Error('Person not found');
        }

        const room = await Room.findOne({ where: { room_id } });
        if (!room) {
            throw new Error('Room not found');
        }

        const access = await Access.findOne({
            where: {
                person: person,
                room: room,
                status: Status.Entry,
                exit_time: IsNull(),
            },
            order: {
                entry_time: 'DESC',
            },
        });

        if (!access) {
            throw new Error("You don't have a registered entry in this room");
        }

        access.exit_time = new Date();
        access.status = Status.Exit;

        return await access.save();
    }

    public static async getCurrentPeopleInRoom(room_id: number): Promise<Person[]> {
        const room = await Room.findOne({ where: { room_id } });
        if (!room) {
            throw new Error('Room not found');
        }

        const accesses = await Access.find({
            where: {
                room: room,
                status: Status.Entry,
                exit_time: IsNull(),
            },
            relations: ['person'],
        });

        const people = accesses.map(access => access.person);

        return people;
    }
}
