import { Request, Response } from 'express';
import { PersonService } from './person.service';

export const getPersons = async (req: Request, res: Response) => {
    try {
        const persons = await PersonService.getPersons();
        const formattedPersons = persons.map(person => ({
            person_id: person.person_id,
            role: person.role,
            first_name: person.first_name,
            last_name: person.last_name,
            email: person.email,
            dni: person.dni,
            phone: person.phone,
            frequency_status: person.frequency_status,
            startup: person.startup ? person.startup.name : null
        }));
        return res.status(200).json({
            success: true,
            data: formattedPersons,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error retrieving users',
        });
    }
};

export const getPersonById = async (req: Request, res: Response) => {
    try {
        const personId = parseInt(req.params.id, 10);

        if (isNaN(personId)) {
            return res.status(400).json({
                success: false,
                message: 'Person ID must be a valid number',
            });
        }

        const person = await PersonService.getPersonById(personId);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: person,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error retrieving user',
        });
    }
};

export const getOwnProfile = async (req: Request, res: Response) => {
    try {
        const personId = req.tokenData.person_id;
        const person = await PersonService.getPersonById(personId);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: {
                person_id: person.person_id,
                first_name: person.first_name,
                last_name: person.last_name,
                startup: person.startup,
                email: person.email,
                password: person.password,
                phone: person.phone,
                role: person.role,
                frequency_status: person.frequency_status,
                dni: person.dni,
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error retrieving profile',
        });
    }
};

export const createUserByAdmin = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password, startup, phone, dni, role, frequency_status } = req.body; 
        const newUser = await PersonService.createUserByAdmin(first_name, last_name, email, password, startup, phone, dni, role, frequency_status); 
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error creating user',
        });
    }
};

export const updateOwnProfile = async (req: Request, res: Response) => {
    try {
        const personIdToUpdate = req.tokenData.person_id;

        const updatedPerson = await PersonService.updateOwnProfile(personIdToUpdate, req.body);
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedPerson,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error updating profile',
        });
    }
};

export const updatePersonByAdmin = async (req: Request, res: Response) => {
    try {
        const personIdToUpdate = parseInt(req.params.id, 10);

        const updatedPerson = await PersonService.updatePersonByAdmin(personIdToUpdate, req.body);
        return res.status(200).json({
            success: true,
            message: 'Person updated successfully by admin',
            data: updatedPerson,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error updating person',
        });
    }
};

export const deletePerson = async (req: Request, res: Response) => {
    try {
        const personId = parseInt(req.params.id, 10);

        if (isNaN(personId)) {
            return res.status(400).json({
                success: false,
                message: 'Person ID must be a valid number',
            });
        }

        await PersonService.deletePerson(personId);
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error deleting user',
        });
    }
};

export const getCurrentAccess = async (req: Request, res: Response) => {
    try {
        const personId = parseInt(req.params.id, 10);

        if (isNaN(personId)) {
            return res.status(400).json({
                success: false,
                message: 'Person ID must be a valid number',
            });
        }

        const currentAccess = await PersonService.getCurrentAccess(personId);

        if (!currentAccess) {
            return res.status(404).json({
                success: false,
                message: 'No current access record found for this person',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Current access retrieved successfully',
            data: {
                access_id: currentAccess.access_id,
                room_id: currentAccess.room.room_id,
                entry_time: currentAccess.entry_time,
                exit_time: currentAccess.exit_time,
                status: currentAccess.status,
                room: {
                    room_name: currentAccess.room.room_name,
                    capacity: currentAccess.room.capacity,
                    room_type: currentAccess.room.room_type
                }
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error retrieving current access',
        });
    }
};

export const getAccessHistory = async (req: Request, res: Response) => {
    try {
        const personId = parseInt(req.params.id, 10);

        if (isNaN(personId)) {
            return res.status(400).json({
                success: false,
                message: 'Person ID must be a valid number',
            });
        }

        const accessHistory = await PersonService.getAccessHistory(personId);

        if (accessHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No access history found for this person',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Access history retrieved successfully',
            data: accessHistory,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error retrieving access history',
        });
    }
};
export const updateFrequencyStatus = async (req: Request, res: Response) => {
    try {
      const persons = await PersonService.getPersons();
      for (const person of persons) {
        await PersonService.updateFrequencyStatus(person.person_id);
      }
      console.log('Frequency status successfully updated');
    } catch (error) {
      console.error('Error updating the frequency status:', error);
    }
  }