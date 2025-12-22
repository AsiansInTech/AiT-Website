import { Router } from 'express';
import { eventController } from '../controllers/eventController';

const router = Router();

// GET /api/events - Get all events
router.get('/', eventController.getAll);

// GET /api/events/:id - Get a single event by ID
router.get('/:id', eventController.getById);

export default router;
