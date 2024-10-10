import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { registerEntry, registerExit, getCurrentPeopleInRoom } from './access.controller';

const router = Router();


router.post('/entry', auth, registerEntry); //OK
router.post('/exit', auth, registerExit); //OK
router.get('/current/room/:room_id', getCurrentPeopleInRoom); //OK

export default router;
