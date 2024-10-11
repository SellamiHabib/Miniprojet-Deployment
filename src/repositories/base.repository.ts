import Redis from 'ioredis';
import redisClient from '../config/redisConfig';
import { BaseModel } from '../schemas/base.schema';
import { ZodObject } from 'zod';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';

export class BaseRepository<T extends BaseModel> {
  protected redisClient: Redis;
  protected keyPrefix: string;
  // disabling eslint for the schema parameter because it's a generic type

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected schema: ZodObject<any>;

  // disabling eslint for the schema parameter because it's a generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(keyPrefix: string, schema: ZodObject<any>) {
    this.redisClient = redisClient;
    this.keyPrefix = keyPrefix;
    this.schema = schema;
  }

  private buildKey(key: string): string {
    return `${this.keyPrefix}:${key}`;
  }

  async get(key: string): Promise<T | null> {
    const fullKey = this.buildKey(key);
    const data = await this.redisClient.get(fullKey);
    if (!data) {
      throw new CustomError('Data not found', StatusCodes.NOT_FOUND);
    }

    try {
      const parsedData = JSON.parse(data);
      return this.schema.parse(parsedData) as T;
    } catch {
      throw new CustomError('Failed to parse data', StatusCodes.UNPROCESSABLE_ENTITY);
    }
  }

  async set(key: string, value: T): Promise<T> {
    const fullKey = this.buildKey(key);
    try {
      const data = JSON.stringify(value);
      await this.redisClient.set(fullKey, data);
      return value;
    } catch {
      throw new CustomError('Failed to set data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(key: string): Promise<void> {
    const fullKey = this.buildKey(key);
    try {
      await this.redisClient.del(fullKey);
    } catch {
      throw new CustomError('Failed to delete data from Redis', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
