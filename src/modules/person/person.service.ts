import bcrypt from 'bcrypt';
import { AccessHistoryResponse } from '../../types/index';
import { Person, Role, Frequency_status } from './person.entity';
import { Access } from '../access/access.entity';
import { AccessHistory } from '../access_history/access_history.entity';
import { IsNull, Between } from 'typeorm';

export class PersonService {
    static async getPersons(): Promise<Person[]> {
        return Person.find({
            relations: ['startup'],
            select: ['person_id', 'role', 'first_name', 'last_name', 'email', 'dni', 'phone', 'frequency_status', 'startup']
        });
    }

    static async getPersonById(personId: number): Promise<Person | null> {
        return Person.findOne({ where: { person_id: personId } });
    }
    static async getProfile(personId: number): Promise<Person | null> {
        return Person.findOne({ where: { person_id: personId }, relations: ['startup'] });
    }

    public static async createUserByAdmin(
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        startup: string,
        phone?: string,
        dni?: string,
        role: Role = Role.Visitor,
        frequency_status?: Frequency_status
    ): Promise<Person> {
        const existingUser = await Person.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('The email is already registered');
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        const newUser = await Person.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            startup: { name: startup },
        });
    
        return await newUser.save();
    }

    static async updateOwnProfile(personId: number, updateData: Partial<Person>): Promise<Person | null> {
        const person = await Person.findOne({ where: { person_id: personId } });
        if (!person) {
            throw new Error(`User not found with id ${personId}`);
        }
    
        const allowedFields: Array<keyof Person> = ['first_name', 'last_name', 'startup', 'email', 'password', 'phone', 'dni'];
    
        const invalidFields = Object.keys(updateData).filter((key) => !allowedFields.includes(key as keyof Person));
        if (invalidFields.length > 0) {
            throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
        }
    
        Object.assign(person, updateData);
        return await person.save();
    }
    

    static async updatePersonByAdmin(personId: number, updateData: Partial<Person>): Promise<Person | null> {
        const person = await Person.findOne({ where: { person_id: personId } });
        if (!person) {
            throw new Error(`User not found with id ${personId}`);
        }
        Object.assign(person, updateData);
        return await person.save();
    }

    static async deletePerson(personId: number): Promise<void> {
        const person = await Person.findOne({ where: { person_id: personId } });
        if (!person) {
            throw new Error(`User not found with id ${personId}`);
        }
        await Person.remove(person);
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
