import { Router } from 'express';
import * as issuesController from '../controllers/issues.controller';
import { requireAuth, requireRole, optionalAuth } from '../middleware/auth';

const router = Router();

// Public issue reporting endpoints
router.post('/analyze-draft', optionalAuth, issuesController.analyzeDraft);
router.post('/', optionalAuth, issuesController.createIssue);
router.get('/track/:ticketNumber', optionalAuth, issuesController.trackIssue);

// Protected routes (Admin + Technician/Worker/Teacher)
router.get('/', requireAuth, issuesController.listIssues);
router.post('/:id/inspect', requireAuth, requireRole(['admin', 'technician', 'worker', 'teacher']), issuesController.startInspection);
router.post('/:id/resolve', requireAuth, requireRole(['admin', 'technician', 'worker', 'teacher']), issuesController.logMaintenance);
router.put('/:id', requireAuth, requireRole(['admin']), issuesController.updateIssue);
router.delete('/:id', requireAuth, requireRole(['admin']), issuesController.deleteIssue);
router.post('/:id/retry-ai', requireAuth, requireRole(['admin']), issuesController.retryAi);

// Admin-only assignment routes
router.put('/:id/assign', requireAuth, requireRole(['admin']), issuesController.assignIssue);

export default router;
