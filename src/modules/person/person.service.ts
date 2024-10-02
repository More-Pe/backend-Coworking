import { AccessHistoryResponse } from '../../types/index';
import { Person, Frequency_status } from './person.entity';
import { Access } from '../access/access.entity';
import { AccessHistory } from '../access_history/access_history.entity';
import { IsNull, Between } from 'typeorm';

export class PersonService {
    static async getPersons(): Promise<Person[]> {
        return Person.find();
      }
    
	static async getCurrentAccess(personId: number): Promise<Access | null> {
		return Access.findOne({
			where: { person_id: personId, exit_time: IsNull() },
			relations: ['room'],
		});
	}

	static async getAccessHistory(
		personId: number,
	): Promise<AccessHistoryResponse[]> {
		const accessHistoryRecords = await AccessHistory.find({
			where: { person_id: personId },
			relations: ['room'],
			order: { access_time: 'DESC' },
		});

		return accessHistoryRecords.map((history) => ({
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

	static async updateFrequencyStatus(personId: number): Promise<void> {
		const person = await Person.findOne({ where: { person_id: personId } });
		if (!person) {
			throw new Error(`Persona no encontrada con id ${personId}`);
		}

		const today = new Date();
		const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

		const accesses = await Access.find({
			where: {
				person_id: personId,
				entry_time: Between(thirtyDaysAgo, today),
			},
		});

		const totalAccesses = accesses.length;

		if (totalAccesses === 0) {
			person.frequency_status = Frequency_status.Absent;
		} else if (totalAccesses >= 12 && totalAccesses <= 20) {
			person.frequency_status = Frequency_status.Frequent;
		} else if (totalAccesses >= 4 && totalAccesses <= 11) {
			person.frequency_status = Frequency_status.Infrequent;
		} else {
			person.frequency_status = Frequency_status.Absent;
		}

		await person.save();
	}
}
