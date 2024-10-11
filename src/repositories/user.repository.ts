import Redis from 'ioredis';
import redisClient from '../config/redisConfig';
import { UserDTO, UserSchema } from '../models/user.model';

export class UserRepository {
  private redisClient: Redis;

  constructor() {
    this.redisClient = redisClient;
  }

  async getUserByEmail(email: string): Promise<UserDTO | null> {
    const userData = await this.redisClient.get(email);
    if (!userData) return null;

    try {
      const user = JSON.parse(userData);
      return UserSchema.parse(user);  // Validate user data using Zod
    } catch (error) {
      console.error('Failed to parse user data', error);
      return null;
    }
  }

  async saveUser(user: UserDTO): Promise<UserDTO> {
    await this.redisClient.set(user.email, JSON.stringify(user));
    return user;
  }
}
