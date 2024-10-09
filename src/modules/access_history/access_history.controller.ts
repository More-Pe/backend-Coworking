import { Request, Response } from 'express';
import { AccessHistoryService } from './access_history.service';

export const getAccessHistories = async (req: Request, res: Response) => {
    try {
        const { start_date, end_date } = req.query;

        if (!start_date || !end_date) {
            return res.status(400).json({ 
                success: false, 
                message: 'Start date and end date are required' 
            });
        }

        const accessHistories = await AccessHistoryService.getAccessHistoriesByDateRange(
            start_date as string, 
            end_date as string
        );

        return res.status(200).json({
            success: true,
            data: accessHistories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving access histories',
            error: (error as Error).message,
        });
    }
};

export const getAccessHistoriesByRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Room ID is required',
            });
        }

        const roomId = parseInt(id, 10);
        if (isNaN(roomId)) {
            return res.status(400).json({
                success: false,
                message: 'The room ID must be a valid number',
            });
        }

        const { start_date, end_date } = req.query;
        const accessHistories = await AccessHistoryService.getAccessHistoriesByRoom(roomId, start_date as string, end_date as string);

        return res.status(200).json({
            success: true,
            data: accessHistories,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving access histories for the room',
            error: error.message,
        });
    }
};
