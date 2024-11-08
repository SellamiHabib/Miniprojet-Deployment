import Redis from 'ioredis';
import { env } from '../../env';

// Create a Redis client instance
const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT, 10),
  password: env.REDIS_PASSWORD,
});

redisClient.on('connect', () => {
  console.log('[database]: Connected to Redis');
});

redisClient.on('error', (error) => {
  // console.error('[database]: Redis connection error:', error);
});

export default redisClient;
