import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { isAdmin } from '../../middlewares/isAdmin';
import { generateDailyReport, getReportsInRange, getRoomUsageStats } from './administration.controller';

const router = Router();

router.post('/daily-report', auth, isAdmin, generateDailyReport); 
router.get('/reports', auth, isAdmin, getReportsInRange); 
router.get('/room-usage', auth, isAdmin, getRoomUsageStats);

export default router;