import { AccessHistoryResponse } from '../../types/index';
import { Access } from '../access/access.entity';
import { AccessHistory } from '../access_history/access_history.entity';
import { IsNull } from 'typeorm';

export class PersonService {
    static async getCurrentAccess(personId: number): Promise<Access | null> {
        return Access.findOne({
            where: { person_id: personId, exit_time: IsNull() },
            relations: ['room'],
        });
    }

    static async getAccessHistory(personId: number): Promise<AccessHistoryResponse[]> {
        const accessHistoryRecords = await AccessHistory.find({
            where: { person_id: personId },
            relations: ['room'],
            order: { access_time: 'DESC' },
        });

        return accessHistoryRecords.map(history => ({
            history_id: history.history_id,
            room: {
                room_id: history.room.room_id,
                room_name: history.room.room_name,
                room_type: history.room.room_type,
            },
            access_time: history.access_time,
            action: history.action,
        }));
    }
}


