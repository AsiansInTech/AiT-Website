import { Router } from 'express';
import { eventController } from '../controllers/eventController';

const router = Router();

// GET /api/events - Get all events
router.get('/', eventController.getAll);

// GET /api/events/:id - Get a single event by ID
router.get('/:id', eventController.getById);

// POST /api/events - Create a new event
router.post('/', eventController.create);

// PUT /api/events/:id - Update an existing event
router.put('/:id', eventController.update);

// DELETE /api/events/:id - Delete an event
router.delete('/:id', eventController.delete);

export default router;

