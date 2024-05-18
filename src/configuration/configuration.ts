import { z } from 'zod';

export default () => ({
  whatsAppAuthFolder:
    process.env.WHATSAPP_AUTH_FOLDER || process.env.PWD + '/auth',
  port: 3000,
  chatMapping: JSON.parse(process.env.CHAT_MAPPING || '{}') as Record<
    string,
    string
  >,
  slackToken: process.env.SLACK_TOKEN,
});

export const schema = z.object({
  port: z.number(),
  whatsAppAuthFolder: z.string(),
  chatMapping: z.record(z.string(), z.string()),
  slackToken: z.string(),
});
