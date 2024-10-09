import { Request, Response } from 'express';
import { RoomService } from './room.service';

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { room_name, capacity, room_type } = req.body;

        if (!room_name || !capacity || !room_type) {
            return res.status(400).json({
                success: false,
                message: 'room name, capacity and type are required',
            });
        }

        const room = await RoomService.createRoom({ room_name, capacity, room_type });

        return res.status(201).json({
            success: true,
            message: 'Room created successfully',
            data: room,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error creating room',
        });
    }
};

export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await RoomService.getAllRooms();

        return res.status(200).json({
            success: true,
            message: 'Rooms getting successfully',
            data: rooms,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error getting rooms',
        });
    }
};

export const getRoomById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const roomId = parseInt(id, 10);

        if (isNaN(roomId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid room ID',
            });
        }

        const room = await RoomService.getRoomById(roomId);

        return res.status(200).json({
            success: true,
            message: 'Room getting successfully',
            data: room,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message || 'Room not found',
        });
    }
};

export const updateRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const roomId = parseInt(id, 10);
        const { room_name, capacity, room_type } = req.body;

        if (isNaN(roomId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid room ID',
            });
        }

        const updatedRoom = await RoomService.updateRoom(roomId, { room_name, capacity, room_type });

        return res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            data: updatedRoom,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error updating room',
        });
    }
};

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const roomId = parseInt(id, 10);

        if (isNaN(roomId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid room ID',
            });
        }

        const message = await RoomService.deleteRoom(roomId);

        return res.status(200).json({
            success: true,
            message: message,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error deleting room',
        });
    }
};

export const getRoomCurrentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const roomId = parseInt(id, 10);

        if (isNaN(roomId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid room ID',
            });
        }

        const { room, currentPeople } = await RoomService.getCurrentStatus(roomId);

        return res.status(200).json({
            success: true,
            message: 'Room status retrieved successfully',
            data: {
                room: {
                    room_id: room.room_id,
                    room_name: room.room_name,
                    capacity: room.capacity,
                    room_type: room.room_type
                },
                currentPeople: currentPeople.map(person => ({
                    person_id: person.person_id,
                    email: person.email,
                    startup: person.startup
                }))
            },
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message || 'Room not found',
        });
    }
};