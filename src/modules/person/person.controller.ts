import { Request, Response } from 'express';
import { PersonService } from './person.service';

export const getCurrentAccess = async (req: Request, res: Response) => {
    try {
        const personId = parseInt(req.params.id, 10);

        if (isNaN(personId)) {
            return res.status(400).json({
                success: false,
                message: 'Person ID must be a valid number',
            });
        }

        const currentAccess = await PersonService.getCurrentAccess(personId);

        if (!currentAccess) {
            return res.status(404).json({
                success: false,
                message: 'No current access record found for this person',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Current access retrieved successfully',
            data: {
                access_id: currentAccess.access_id,
                room_id: currentAccess.room.room_id,
                entry_time: currentAccess.entry_time,
                exit_time: currentAccess.exit_time,
                status: currentAccess.status,
                room: {
                    room_name: currentAccess.room.room_name,
                    capacity: currentAccess.room.capacity,
                    room_type: currentAccess.room.room_type
                }
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error retrieving current access',
        });
    }
};

export const getAccessHistory = async (req: Request, res: Response) => {
    try {
        const personId = parseInt(req.params.id, 10);

        if (isNaN(personId)) {
            return res.status(400).json({
                success: false,
                message: 'Person ID must be a valid number',
            });
        }

        const accessHistory = await PersonService.getAccessHistory(personId);

        if (accessHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No access history found for this person',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Access history retrieved successfully',
            data: accessHistory,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error retrieving access history',
        });
    }
};
