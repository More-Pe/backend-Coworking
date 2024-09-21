import { Router } from 'express';
import {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    getRoomCurrentStatus
} from './room.controller';
import { auth } from '../../middlewares/auth';
import { isAdmin } from '../../middlewares/isAdmin';

const router = Router();

router.post('/',auth, isAdmin, createRoom); //OK
router.get('/', getAllRooms); //OK
router.get('/:id', getRoomById); //OK
router.put('/:id',auth, isAdmin, updateRoom); //OK
router.delete('/:id',auth, isAdmin, deleteRoom); //OK
router.get('/:id/current-status', getRoomCurrentStatus); //Responds but have to try again when the access controllers work


export default router;