import { Access, Status } from './access.entity';
import { AccessHistory } from '../access_history/access_history.entity';
import { Person } from '../person/person.entity';
import { Room } from '../room/room.entity';
import { IsNull } from 'typeorm';

export class AccessService {
	public static async registerEntry(
		person_id: number,
		room_id: number,
	): Promise<Access> {
		const room = await Room.findOne({ where: { room_id } });
		if (!room) {
			throw new Error('Room not found');
		}

		const person = await Person.findOne({ where: { person_id } });
		if (!person) {
			throw new Error('Person not found');
		}

		const existingActiveAccess = await Access.findOne({
			where: {
				person_id: person_id,
				status: Status.Entry,
				exit_time: IsNull(),
			},
		});

		if (existingActiveAccess) {
			if (existingActiveAccess.room_id === room_id) {
				throw new Error(
					'You have already entered this room and haven’t registered an exit.',
				);
			} else {
				throw new Error('You already have an active entry in another room.');
			}
		}

		const currentPeople = await AccessService.getCurrentPeopleInRoom(room_id);
		if (currentPeople.people.length >= room.capacity) {
			throw new Error('The room has reached its maximum capacity');
		}

		const access = Access.create({
			person_id: person.person_id,
			room_id: room.room_id,
			entry_time: new Date(),
			status: Status.Entry,
		});

		const savedAccess = await access.save();

		await AccessHistory.create({
			person_id: person.person_id,
			room_id: room.room_id,
			access_time: savedAccess.entry_time,
			action: 'entry',
		}).save();

		return savedAccess;
	}

	public static async registerExit(
		person_id: number,
		room_id: number,
	): Promise<Access> {
		const room = await Room.findOne({ where: { room_id } });
		if (!room) {
			throw new Error('Room not found');
		}

		const access = await Access.findOne({
			where: {
				person_id: person_id,
				room_id: room_id,
				status: Status.Entry,
				exit_time: IsNull(),
			},
			order: {
				entry_time: 'DESC',
			},
		});

		if (!access) {
			throw new Error("You don't have a registered entry in this room");
		}

		access.exit_time = new Date();
		access.status = Status.Exit;

		const savedAccess = await access.save();

		await AccessHistory.create({
			person_id: person_id,
			room_id: room_id,
			access_time: savedAccess.exit_time!,
			action: 'exit',
		}).save();

		return savedAccess;
	}

	public static async getCurrentPeopleInRoom(
		room_id: number,
	): Promise<{ people: Omit<Person, 'password'>[]; count: number }> {
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

		const people = accesses.map((access) => {
			const { password, ...personData } = access.person;
			return personData as Omit<Person, 'password'>;
		});

		return { count: people.length, people };
	}

	public static async updateAccessStatusToExit(): Promise<void> {
		const activeAccesses = await Access.find({
			where: {
				status: Status.Entry,
				exit_time: IsNull(),
			},
		});

		for (const access of activeAccesses) {
			access.status = Status.Exit;
			access.exit_time = new Date();
			await access.save();
		}
	}
}
