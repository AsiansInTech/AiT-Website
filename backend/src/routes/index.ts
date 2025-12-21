import { Router } from 'express';
import { healthController } from '../controllers';
import officersRouter from './officers.routes';
import eventRoutes from './eventRoutes';

const router = Router();

router.get('/health', healthController.health);
router.use('/officers', officersRouter);
router.use('/events', eventRoutes);

export default router;

