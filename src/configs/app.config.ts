import { registerAs } from '@nestjs/config';

export const appconfig = registerAs('appconfig', () => ({
  environment: process.env.NODE_ENV,
}));
