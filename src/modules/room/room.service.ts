import { Room } from './room.entity';
import { Access, Status } from '../access/access.entity';
import { Person } from '../person/person.entity';
import { IsNull } from 'typeorm';

export class RoomService {
    public static async createRoom(data: Partial<Room>): Promise<Room> {
        try {
            const { room_name, capacity, room_type } = data;

            if (!room_name || !capacity || !room_type) {
                throw new Error('room name, capacity and type are required');
            }


            const room = Room.create({
                room_name,
                capacity,
                room_type,
            });

            return await room.save();
        } catch (error: any) {
            throw new Error(error.message || 'Error creating room');
        }
    }

    public static async getAllRooms(): Promise<Room[]> {
        try {
            return await Room.find();
        } catch (error: any) {
            throw new Error(error.message || 'Error getting room');
        }
    }

    public static async getRoomById(room_id: number): Promise<Room> {
        try {
            const room = await Room.findOne({ where: { room_id } });
            if (!room) {
                throw new Error('Room not found');
            }
            return room;
        } catch (error: any) {
            throw new Error(error.message || 'Error getting room');
        }
    }

    public static async updateRoom(room_id: number, data: Partial<Room>): Promise<Room> {
        try {
            const room = await Room.findOne({ where: { room_id } });
            if (!room) {
                throw new Error('Room not found');
            }

            Room.merge(room, data);
            return await room.save();
        } catch (error: any) {
            throw new Error(error.message || 'Error deleting room');
        }
    }

    public static async deleteRoom(room_id: number): Promise<string> {
        try {
            const room = await Room.findOne({ where: { room_id } });
            if (!room) {
                throw new Error('Room not found');
            }

            await room.remove();
            return 'Room deleted successfully';
        } catch (error: any) {
            throw new Error(error.message || 'Error deleting room');
        }
    }

    public static async getCurrentStatus(room_id: number): Promise<{ room: Room; currentPeople: Person[] }> {
        try {
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

            const currentPeople = accesses.map(access => access.person);

            return { room, currentPeople };
        } catch (error: any) {
            throw new Error(error.message || 'Error getting room status');
        }
    }
}
