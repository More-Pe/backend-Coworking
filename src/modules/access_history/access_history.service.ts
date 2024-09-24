import { Between } from 'typeorm';
import { AccessHistory } from './access_history.entity';

export class AccessHistoryService {
    
    public static async getAccessHistoriesByDateRange(startDate: string, endDate: string): Promise<AccessHistory[]> {
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        return await AccessHistory.find({
            where: {
                access_time: Between(new Date(startDate), adjustedEndDate),
            },
            relations: ['person', 'room'],
        });
    }

    public static async getAccessHistoriesByRoom(room_id: number, startDate?: string, endDate?: string): Promise<AccessHistory[]> {
        const whereClause: any = { room_id };
        
        if (startDate && endDate) {
            whereClause.access_time = Between(new Date(startDate), new Date(endDate));
        }

        return await AccessHistory.find({
            where: whereClause,
            relations: { person: true, room: true },
        });
    }
}
