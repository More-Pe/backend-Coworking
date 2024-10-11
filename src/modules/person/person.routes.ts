import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { isAdmin } from '../../middlewares/isAdmin';
import {
	getPersons,
	getPersonById,
	getOwnProfile,
	createUserByAdmin,
	updatePersonByAdmin,
	updateOwnProfile,
	deletePerson,
	getCurrentAccess,
	getAccessHistory,
} from './person.controller';

const router = Router();

router.get('/profile', auth, getOwnProfile);
router.put('/profile', auth, updateOwnProfile);

router.get('/', auth, isAdmin, getPersons);
router.post('/create', auth, isAdmin, createUserByAdmin);

router.get('/:id/current-access', auth, getCurrentAccess);
router.get('/:id/access-history', auth, isAdmin, getAccessHistory);
router.get('/:id', auth, isAdmin, getPersonById);
router.put('/:id', auth, isAdmin, updatePersonByAdmin);
router.delete('/:id', auth, isAdmin, deletePerson);

export default router;
