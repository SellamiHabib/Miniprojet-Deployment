import Redis from 'ioredis';
import { env } from '../../env';

// Create a Redis client instance
const redis = new Redis({
  host: env.REDIS_HOST || '127.0.0.1',  // default host
  port: parseInt(env.REDIS_PORT || '6379', 10),  // default port
  password: env.REDIS_PASSWORD || undefined,  // if your Redis has a password
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});

export default redis;
