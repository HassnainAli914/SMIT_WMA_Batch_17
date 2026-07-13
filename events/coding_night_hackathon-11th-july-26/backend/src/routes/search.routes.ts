import { Router } from 'express';
import { SearchController } from '../controllers/search.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();
const searchController = new SearchController();

router.get('/', requireAuth, searchController.search.bind(searchController));

export default router;
