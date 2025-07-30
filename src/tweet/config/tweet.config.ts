import { registerAs } from '@nestjs/config';

export const tweetConfig = registerAs('tweetConfig', () => ({
  tweetApiKey: process.env.TWEET_API_KEY,
}));
