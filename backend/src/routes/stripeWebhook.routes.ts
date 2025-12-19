import { Router } from 'express';
import { stripeWebhookController } from '../controllers/stripeWebhook.controller';

const router = Router();

router.post('/', stripeWebhookController.handleStripeWebhook);

export default router;

