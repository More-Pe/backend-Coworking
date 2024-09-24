import { Router } from 'express';

const router = Router();

router.post('/:id/current-access');
router.post('/:id/access-history');

export default router;