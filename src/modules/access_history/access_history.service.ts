import { Between } from 'typeorm';
import { AccessHistory } from './access_history.entity';
import { AccessHistoryResponse } from '../../types';

export class AccessHistoryService {
    
    public static async getAccessHistoriesByDateRange(startDate: string, endDate: string): Promise<AccessHistoryResponse[]> {
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        const accessHistories = await AccessHistory.find({
            where: {
                access_time: Between(new Date(startDate), adjustedEndDate),
            },
            relations: ['person', 'room'],
        });

        return accessHistories.map(history => ({
            history_id: history.history_id,
            room: {
                room_id: history.room.room_id,
                room_name: history.room.room_name,
                room_type: history.room.room_type,
            },
            access_time: history.access_time,
            action: history.action,
            person: {
                first_name: history.person.first_name,
                startup: history.person.startup,
                email: history.person.email,
            }
        }));
    }

    public static async getAccessHistoriesByRoom(room_id: number, startDate?: string, endDate?: string): Promise<AccessHistoryResponse[]> {
        const whereClause: any = { room_id };
        
        if (startDate && endDate) {
            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
            whereClause.access_time = Between(new Date(startDate), adjustedEndDate);
        }

        const accessHistories = await AccessHistory.find({
            where: whereClause,
            relations: { person: true, room: true },
        });

        return accessHistories.map(history => ({
            history_id: history.history_id,
            room: {
                room_id: history.room.room_id,
                room_name: history.room.room_name,
                room_type: history.room.room_type,
            },
            access_time: history.access_time,
            action: history.action,
            person: {
                first_name: history.person.first_name,
                startup: history.person.startup,
                email: history.person.email,
            }
        }));
    }
}
