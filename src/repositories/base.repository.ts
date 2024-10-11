import Redis from 'ioredis';
import redisClient from '../config/redisConfig';
import { BaseModel } from '../schemas/base.schema';

export class BaseRepository<T extends BaseModel> {
  protected redisClient: Redis;
  protected keyPrefix: string;

  constructor(keyPrefix: string) {
    this.redisClient = redisClient;
    this.keyPrefix = keyPrefix;
  }

  private buildKey(key: string): string {
    return `${this.keyPrefix}:${key}`;
  }

  async get(key: string): Promise<T | null> {
    const fullKey = this.buildKey(key);
    const data = await this.redisClient.get(fullKey);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.error('Failed to parse data from Redis', error);
      return null;
    }
  }

  async set(key: string, value: T): Promise<T> {
    const fullKey = this.buildKey(key);
    try {
      await this.redisClient.set(fullKey, JSON.stringify(value));
      return value;
    } catch (error) {
      console.error('Failed to set data in Redis', error);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    const fullKey = this.buildKey(key);
    try {
      await this.redisClient.del(fullKey);
    } catch (error) {
      console.error('Failed to delete data from Redis', error);
      throw error;
    }
  }
}
