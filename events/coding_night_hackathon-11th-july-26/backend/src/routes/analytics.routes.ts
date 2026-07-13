import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

router.get('/summary', requireAuth, analyticsController.getSummary);

export default router;
