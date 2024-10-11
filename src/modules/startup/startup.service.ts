import { Startup, Program } from './startup.entity';
import { Person } from '../person/person.entity';

export class StartupService {
  public static async getStartups(): Promise<Startup[]> {
    return await Startup.find();
  }

  public static async getStartupById(startup_id: number): Promise<Startup> {
    const startup = await Startup.findOne({
      where: { startup_id }
    });
    if (!startup) {
      throw new Error(`Startup not found with id ${startup_id}`);
    }
    return startup;
  }

  public static async createStartup(data: Partial<Startup>): Promise<Startup> {
    if (!data.program || !Object.values(Program).includes(data.program as Program)) {
      throw new Error('Invalid program. Should be one of these: ' + Object.values(Program).join(', '));
    }

    const startup = Startup.create({
      name: data.name,
      description: data.description,
      program: data.program as Program,
    });
    return await startup.save();
  }

  public static async updateStartup(startup_id: number, data: Partial<Startup>): Promise<Startup> {
    const startup = await Startup.findOne({ where: { startup_id } });
    if (!startup) {
      throw new Error(`Startup not found ${startup_id}`);
    }

    if (data.program && !Object.values(Program).includes(data.program as Program)) {
      throw new Error('Invalid program. Should be one of these: ' + Object.values(Program).join(', '));
    }

    Object.assign(startup, data);
    return await startup.save();
  }

  public static async deleteStartup(startup_id: number): Promise<void> {
    const startup = await Startup.findOne({ where: { startup_id } });
    if (!startup) {
      throw new Error(`Startup not found ${startup_id}`);
    }
    await Startup.remove(startup);
  }

  public static async getPersonsByStartupId(startup_id: number): Promise<Person[]> {
    const startup = await Startup.findOne({
      where: { startup_id },
      relations: ['persons'],
    });
    if (!startup) {
      throw new Error(`Startup not found ${startup_id}`);
    }
    return startup.persons;
  }

  public static async getPrograms(): Promise<Program[]> {
    const programs = Object.values(Program);
    if (!programs || programs.length === 0) {
      throw new Error(`Programs not found`);
    }
    return programs;
  }
}