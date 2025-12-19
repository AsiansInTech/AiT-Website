import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';
import stripeWebhookRouter from './routes/stripeWebhook.routes';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();

// Stripe webhook FIRST - raw body + router chained together
// This must come BEFORE cors and express.json
app.use(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookRouter
);

// Then CORS and JSON for everything else
app.use(cors());
app.use(express.json());

// Other API routes
app.use('/api', routes);

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

