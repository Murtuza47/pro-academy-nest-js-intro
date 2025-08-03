import { registerAs } from '@nestjs/config';

export const AuthConfig = registerAs('authConfig', () => ({
  secret: process.env.JWT_SECRET_TOKEN,
  expiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '3600', 10),
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
}));
