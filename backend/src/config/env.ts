import { logger } from '../utils/logger';

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  notionToken: process.env.NOTION_TOKEN,
  notionOfficersDbId: process.env.NOTION_OFFICERS_DB_ID,
  notionMembersDbId: process.env.NOTION_MEMBERS_DB_ID,
  // Stripe configuration
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

if (!config.notionToken) {
  logger.warn('NOTION_TOKEN is not set. Notion integration will not work.');
}

if (!config.notionOfficersDbId) {
  logger.warn('NOTION_OFFICERS_DB_ID is not set. Officers endpoint will not work.');
}

if (!config.notionMembersDbId) {
  logger.warn('NOTION_MEMBERS_DB_ID is not set. Members endpoint will not work.');
}

if (!config.stripeSecretKey) {
  logger.warn('STRIPE_SECRET_KEY is not set. Stripe payments will not work.');
}

if (!config.stripeWebhookSecret) {
  logger.warn('STRIPE_WEBHOOK_SECRET is not set. Stripe webhooks will not verify.');
}

