import { User, userSchema } from '../schemas/userSchema';
import { BaseRepository } from './base.repository';
import Redis from 'ioredis';

export class UserRepository extends BaseRepository<User> {
  constructor(redisClient?: Redis) {
    super('user', userSchema, redisClient);
  }
}
