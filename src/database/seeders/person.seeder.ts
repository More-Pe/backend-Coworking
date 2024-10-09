import * as bcrypt from 'bcrypt';
import { Person, Role, Frequency_status} from '../../modules/person/person.entity';

export class PersonSeeder {
  async run() {
    const admin = new Person();
    admin.role = Role.Admin;
    admin.first_name = 'Admin';
    admin.last_name = 'Admin';
    admin.startup = 'Startup';
    admin.email = 'admin@admin.com';
    admin.password = await bcrypt.hash('123456789', 10);
    admin.frequency_status = Frequency_status.Absent;
    await admin.save();

    const visitors = [
      { first_name: 'Visitor 1', last_name: 'Apellido 1', startup: 'Startup 1', email: 'visitor1@example.com' },
      { first_name: 'Visitor 2', last_name: 'Apellido 2', startup: 'Startup 2', email: 'visitor2@example.com' },
      { first_name: 'Visitor 3', last_name: 'Apellido 3', startup: 'Startup 3', email: 'visitor3@example.com' },
    ];

    for (const visitor of visitors) {
      const person = new Person();
      person.role = Role.Visitor;
      person.first_name = visitor.first_name;
      person.last_name = visitor.last_name;
      person.startup = visitor.startup;
      person.email = visitor.email;
      person.password = await bcrypt.hash('123456789', 10);
      person.frequency_status = Frequency_status.Absent;
      await person.save();
    }

    const users = [
      { first_name: 'User 1', last_name: 'Apellido 1', startup: 'Startup 1', email: 'user1@example.com' },
      { first_name: 'User 2', last_name: 'Apellido 2', startup: 'Startup 2', email: 'user2@example.com' },
      { first_name: 'User 3', last_name: 'Apellido 3', startup: 'Startup 3', email: 'user3@example.com' },
    ];

    for (const user of users) {
      const person = new Person();
      person.role = Role.User;
      person.first_name = user.first_name;
      person.last_name = user.last_name;
      person.startup = user.startup;
      person.email = user.email;
      person.password = await bcrypt.hash('123456789', 10);
      person.frequency_status = Frequency_status.Absent;
      await person.save();
    }
  }
}