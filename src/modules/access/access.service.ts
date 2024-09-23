import { Access, Status } from './access.entity';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';
import { IsNull } from 'typeorm';

export class AccessService {
    
    public static async registerEntry(person_id: number, room_id: number): Promise<Access> {
        // Verificar si la sala existe
        const room = await Room.findOne({ where: { room_id } });
        if (!room) {
            throw new Error('Room not found');
        }
    
        // Verificar si la persona existe
        const person = await Person.findOne({ where: { person_id } });
        if (!person) {
            throw new Error('Person not found');
        }
    
        // Verificar si la persona ya tiene un acceso activo en cualquier sala
        const existingActiveAccess = await Access.findOne({
            where: {
                person_id: person_id,
                status: Status.Entry,
                exit_time: IsNull(), // Acceso activo sin salida
            },
        });
    
        console.log(`Existing active access for person ${person_id}:`, existingActiveAccess);
    
        // Si la persona ya tiene un acceso activo
        if (existingActiveAccess) {
            // Verificar si la entrada activa es en la misma sala
            if (existingActiveAccess.room_id === room_id) {
                console.log(`Person ${person_id} is trying to re-enter the same room: ${room_id}`);
                throw new Error('You have already entered this room and haven’t registered an exit.');
            } else {
                console.log(`Person ${person_id} is trying to enter a new room: ${room_id} while active in room: ${existingActiveAccess.room_id}`);
                throw new Error('You already have an active entry in another room.');
            }
        }
    
        // Comprobar la capacidad de la sala
        const currentPeople = await AccessService.getCurrentPeopleInRoom(room_id);
        console.log(`Current people in room ${room_id}: ${currentPeople.length}, Capacity: ${room.capacity}`);
    
        if (currentPeople.length >= room.capacity) {
            throw new Error('The room has reached its maximum capacity');
        }
    
        // Crear nuevo acceso
        const access = Access.create({
            person_id: person.person_id,
            room_id: room.room_id,
            entry_time: new Date(),
            status: Status.Entry,
        });
    
        console.log('Registering new entry:', access);
    
        // Guardar el nuevo acceso
        return await access.save();
    }


    // Método para registrar una salida
    public static async registerExit(person_id: number, room_id: number): Promise<Access> {
        const room = await Room.findOne({ where: { room_id } });
        if (!room) {
            throw new Error('Room not found');
        }

        const access = await Access.findOne({
            where: {
                person_id: person_id,
                room_id: room_id,
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

    // Método para obtener las personas actuales en una sala
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

