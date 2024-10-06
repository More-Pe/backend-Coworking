import bcrypt from 'bcrypt';
import { Startup } from '../startup/startup.entity';
import { Person } from '../person/person.entity';
import jwt from 'jsonwebtoken';

export class AuthService {

    public static async register(first_name: string, last_name: string, email: string, password: string, startupName: string) {

        const existingUser  = await Person.findOne({ where: { email } });
        if (existingUser ) {
            throw new Error('The email is already registered');
        }
        const startup = await Startup.findOne({ where: { name: startupName } });
        if (!startup) {
            throw new Error('Startup not found');
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new Person();
        newUser .first_name = first_name;
        newUser .last_name = last_name;
        newUser .email = email;
        newUser .password = hashedPassword;
        newUser .startup = startup; // Ensure 'startup' is a Startup object
        
        await newUser.save();
        
        return newUser;
    }

    public static async login(email: string, password: string) {
    
        const user = await Person.findOne({ where: { email } });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
            {
                person_id: user.person_id,
                role: user.role,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '2h' }
        );

        return { user, token };
    }
}
