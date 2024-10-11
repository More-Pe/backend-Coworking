import { Request, Response } from 'express';
import { AccessService } from './access.service';

export const registerEntry = async (req: Request, res: Response) => {
    try {
      const { room_id } = req.body;
      const person_id = req.tokenData?.person_id;
  
      if (!person_id) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Person ID is missing from the token',
        });
      }
  
      if (!room_id) {
        return res.status(400).json({
          success: false,
          message: 'Room ID is required',
        });
      }
  
      const roomIdNumber = parseInt(room_id, 10);
      if (isNaN(roomIdNumber)) {
        return res.status(400).json({
          success: false,
          message: 'The room ID has to be a valid number',
        });
      }
  
      if (roomIdNumber <= 0 || person_id <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Room ID and person ID must be positive numbers',
        });
      }
  
      const access = await AccessService.registerEntry(person_id, roomIdNumber);
  
      return res.status(201).json({
        success: true,
        message: 'Entry registered successfully',
        data: access,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Error registering entry',
      });
    }
  };

export const registerExit = async (req: Request, res: Response) => {
    try {
        const { room_id } = req.body;
        const person_id = req.tokenData.person_id;

        if (!room_id) {
            return res.status(400).json({
                success: false,
                message: 'Room ID is required',
            });
        }

        const roomIdNumber = parseInt(room_id, 10);
        if (isNaN(roomIdNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Room ID has to be a valid number',
            });
        }

        const access = await AccessService.registerExit(person_id, roomIdNumber);

        return res.status(200).json({
            success: true,
            message: 'Exit registered successfully',
            data: access,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error registering exit',
        });
    }
};

export const getCurrentPeopleInRoom = async (req: Request, res: Response) => {
    try {
        const { room_id } = req.params;

        if (!room_id) {
            return res.status(400).json({
                success: false,
                message: 'Room ID is required',
            });
        }

        const roomIdNumber = parseInt(room_id, 10);
        if (isNaN(roomIdNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Room ID has to be a valid number',
            });
        }

        const people = await AccessService.getCurrentPeopleInRoom(roomIdNumber);

        return res.status(200).json({
            success: true,
            message: 'Current people in room list getting successfully',
            data: people,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error getting current people in room list',
        });
    }
};
