import { Startup } from './startup.entity';
import { Person } from '../person/person.entity';

export class StartupService {
  public static async getStartups(): Promise<Startup[]> {
    return await Startup.find({ relations: ['persons'] });
  }

  public static async getStartupById(startup_id: number): Promise<Startup> {
    const startup = await Startup.findOne({
      where: { startup_id },
      relations: ['persons'],
    });
    if (!startup) {
      throw new Error(`Startup no encontrado con id ${startup_id}`);
    }
    return startup;
  }

  public static async createStartup(data: Partial<Startup>): Promise<Startup> {
    const startup = Startup.create({
      name: data.name,
      description: data.description,
      program: data.program,
    });
    return await startup.save();
  }

  public static async updateStartup(startup_id: number, data: Partial<Startup>): Promise<Startup> {
    const startup = await Startup.findOne({ where: { startup_id } });
    if (!startup) {
      throw new Error(`Startup no encontrado con id ${startup_id}`);
    }
    Object.assign(startup, data);
    return await startup.save();
  }

  public static async deleteStartup(startup_id: number): Promise<void> {
    const startup = await Startup.findOne({ where: { startup_id } });
    if (!startup) {
      throw new Error(`Startup no encontrado con id ${startup_id}`);
    }
    await Startup.remove(startup);
  }

  public static async getPersonsByStartupId(startup_id: number): Promise<Person[]> {
    const startup = await Startup.findOne({
      where: { startup_id },
      relations: ['persons'],
    });
    if (!startup) {
      throw new Error(`Startup no encontrado con id ${startup_id}`);
    }
    return startup.persons;
  }
}