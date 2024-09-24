import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { isAdmin } from '../../middlewares/isAdmin';
import { getAccessHistories, getAccessHistoriesByRoom } from './access_history.controller';

const router = Router();


router.get('/', auth, isAdmin, getAccessHistories); //OK
router.get('/room/:id', auth, isAdmin, getAccessHistoriesByRoom); //OK

export default router;
