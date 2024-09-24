import { Router } from 'express';
import  { auth } from '../../middlewares/auth';
import { isAdmin } from '../../middlewares/isAdmin';
import { getCurrentAccess, getAccessHistory } from './person.controller';

const router = Router();

router.get('/:id/current-access', auth, isAdmin, getCurrentAccess);
router.get('/:id/access-history', auth, isAdmin, getAccessHistory);

export default router;