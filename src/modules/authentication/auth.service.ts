import bcrypt from 'bcrypt';
import { Person } from '../person/person.entity';
import jwt from 'jsonwebtoken';

export class AuthService {

    public static async register(email: string, password: string, startup: string) {

        const existingUser = await Person.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('The email is already registered');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newPerson = Person.create({
            first_name: '',
            last_name: '',
            dni: '',
            phone: '',
            email: email,
            password: hashedPassword,
            startup: startup,
        });

        await newPerson.save();

        return newPerson;
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
                id: user.person_id,
                role: user.role,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '2h' }
        );

        return { user, token };
    }
}
